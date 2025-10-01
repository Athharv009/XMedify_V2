import { useEffect, useState, useRef } from "react";
import styles from "./SearchBar.module.css";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import { useSnackbar } from "notistack";

export default function SearchBar({
  setStoreState,
  setStoreCity,
  setDisplayHospitalCard,
  initialState = "",
  initialCity = "",
}) {
  const { enqueueSnackbar } = useSnackbar();

  const [stateInput, setStateInput] = useState(initialState);
  const [cityInput, setCityInput] = useState(initialCity);
  const [suggestionsState, setSuggestionsState] = useState([]);
  const [suggestionsCity, setSuggestionsCity] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
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

  // Fetch cities if state is pre-filled
  useEffect(() => {
    if (initialState) {
      axios
        .get(`https://meddata-backend.onrender.com/cities/${initialState}`)
        .then((res) => setAllCities(res.data))
        .catch((err) => console.error("Error fetching Cities: ", err));
    }
  }, [initialState]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (stateSuggestionsRef.current && !stateSuggestionsRef.current.contains(event.target)) {
        setSuggestionsState([]);
      }
      if (citySuggestionsRef.current && !citySuggestionsRef.current.contains(event.target)) {
        setSuggestionsCity([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter state suggestions
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

  const handleInputChangeState = (e) => setStateInput(e.target.value);

  const handleSelectState = (state) => {
    setStateInput(state);
    setStoreState(state);
    setSuggestionsState([]);

    axios
      .get(`https://meddata-backend.onrender.com/cities/${state}`)
      .then((res) => setAllCities(res.data))
      .catch((err) => console.error("Error fetching Cities: ", err));

    setCityInput("");
    setStoreCity("");
  };

  // Filter city suggestions
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

  const handleInputChangeCity = (e) => setCityInput(e.target.value);
  const handleSelectCity = (city) => {
    setCityInput(city);
    setStoreCity(city);
    setSuggestionsCity([]);
  };

  // Handle search button click
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

    enqueueSnackbar("Searching hospitals...", { variant: "success" });
    setStoreState(stateInput);
    setStoreCity(cityInput);
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
          onChange={handleInputChangeState}
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

      <div className={styles.searchCity}  ref={citySuggestionsRef} id="city">
        <img src={require("../../assets/locator.png")} alt="location" height="24" width="24" />
        <input
          type="text"
          placeholder="City"
          className={styles.searchInputCity}
          value={cityInput}
          onChange={handleInputChangeCity}
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
