import { useEffect, useState, useRef } from "react";
import styles from "./SearchBar.module.css";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  initialState = "",
  initialCity = "",
  setStoreState,
  setStoreCity,
  setDisplayHospitalCard,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [stateInput, setStateInput] = useState(initialState);
  const [cityInput, setCityInput] = useState(initialCity);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [suggestionsState, setSuggestionsState] = useState([]);
  const [suggestionsCity, setSuggestionsCity] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedInputState = useDebounce(stateInput, 500);
  const debouncedInputCity = useDebounce(cityInput, 500);

  const stateSuggestionsRef = useRef(null);
  const citySuggestionsRef = useRef(null);

  // Fetch all states
  useEffect(() => {
    axios
      .get(`https://meddata-backend.onrender.com/states`)
      .then((res) => setAllStates(res.data))
      .catch((err) => console.error("Error fetching States: ", err));
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        stateSuggestionsRef.current &&
        !stateSuggestionsRef.current.contains(event.target)
      ) {
        setSuggestionsState([]);
      }
      if (
        citySuggestionsRef.current &&
        !citySuggestionsRef.current.contains(event.target)
      ) {
        setSuggestionsCity([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter states for suggestions
  useEffect(() => {
    if (debouncedInputState.length > 0) {
      setLoading(true);
      const filtered = allStates.filter((item) =>
        item.toLowerCase().startsWith(debouncedInputState.toLowerCase())
      );
      setSuggestionsState(filtered);
      setLoading(false);
    } else {
      setSuggestionsState([]);
    }
  }, [debouncedInputState, allStates]);

  // Filter cities for suggestions
  useEffect(() => {
    if (debouncedInputCity.length > 0 && stateInput.trim() !== "") {
      setLoading(true);
      const filtered = allCities.filter((item) =>
        item.toLowerCase().startsWith(debouncedInputCity.toLowerCase())
      );
      setSuggestionsCity(filtered);
      setLoading(false);
    } else {
      setSuggestionsCity([]);
    }
  }, [debouncedInputCity, allCities, stateInput]);

  // Fetch cities when state is selected
  const handleSelectState = (state) => {
    setStateInput(state);
    setStoreState(state);
    setSuggestionsState([]);
    setCityInput("");
    setStoreCity("");

    axios
      .get(`https://meddata-backend.onrender.com/cities/${state}`)
      .then((res) => setAllCities(res.data))
      .catch((err) => console.error("Error fetching Cities: ", err));
  };

  const handleSelectCity = (city) => {
    setCityInput(city);
    setStoreCity(city);
    setSuggestionsCity([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!allStates.includes(stateInput)) {
      setDisplayHospitalCard(false);
      enqueueSnackbar("Please select a valid State from suggestions.", { variant: "warning" });
      return;
    }
    if (!allCities.includes(cityInput)) {
      setDisplayHospitalCard(false);
      enqueueSnackbar("Please select a valid City from suggestions.", { variant: "warning" });
      return;
    }

    // Update URL with state/city
    navigate(`/find-doctors?state=${encodeURIComponent(stateInput)}&city=${encodeURIComponent(cityInput)}`);

    enqueueSnackbar("Searching hospitals...", { variant: "success" });
    setDisplayHospitalCard(true);
  };

  return (
    <form className={styles.mainContainer} onSubmit={handleSearch}>
      <div className={styles.searchState} id="state" ref={stateSuggestionsRef}>
        <img src={require("../../assets/locator.png")} alt="location" height="24" width="24" />
        <input
          type="text"
          placeholder="State"
          className={styles.searchInputState}
          value={stateInput}
          onChange={(e) => setStateInput(e.target.value)}
          required
        />
        {(loading || suggestionsState.length > 0) && (
          <ul className={styles.suggestionsList}>
            {loading ? (
              <li className={styles.loadingMessage}>Loading...</li>
            ) : (
              suggestionsState.map((state, idx) => (
                <li key={idx} onClick={() => handleSelectState(state)}>
                  {state}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <div className={styles.searchCity} id="city" ref={citySuggestionsRef}>
        <img src={require("../../assets/locator.png")} alt="location" height="24" width="24" />
        <input
          type="text"
          placeholder="City"
          className={styles.searchInputCity}
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          required
        />
        {(loading || suggestionsCity.length > 0) && (
          <ul className={styles.suggestionsList}>
            {loading ? (
              <li className={styles.loadingMessage}>Loading...</li>
            ) : (
              suggestionsCity.map((city, idx) => (
                <li key={idx} onClick={() => handleSelectCity(city)}>
                  {city}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <button className={styles.btnSearch} type="submit" id="searchBtn">
        <img src={require("../../assets/search-icn-white.png")} alt="search" width="20" height="20" />
        Search
      </button>
    </form>
  );
}
