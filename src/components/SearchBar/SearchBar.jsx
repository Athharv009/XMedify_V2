import { useEffect, useState, useRef } from "react";
import styles from "./SearchBar.module.css";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import { useSnackbar } from "notistack";

export default function SearchBar({
  setStoreState,
  setStoreCity,
  setDisplayHospitalCard,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const [stateInput, setStateInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [suggestionsState, setSuggestionsState] = useState([]);
  const [suggestionsCity, setSuggestionsCity] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedInputState = useDebounce(stateInput, 500);
  const debouncedInputCity = useDebounce(cityInput, 500);

  const stateSuggestionsRef = useRef(null);
  const citySuggestionsRef = useRef(null);

  useEffect(() => {
    axios
      .get(`https://meddata-backend.onrender.com/states`)
      .then((res) => setAllStates(res.data))
      .catch((err) => console.error("Error fetching States: ", err));
  }, []);

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

  const handleSearch = (e) => {
    e.preventDefault();

    if (!allStates.includes(stateInput)) {
      setDisplayHospitalCard(false);
      enqueueSnackbar("Please select a valid State from suggestions.", {
        variant: "warning",
      });
      return;
    }
    if (!allCities.includes(cityInput)) {
      setDisplayHospitalCard(false);
      enqueueSnackbar("Please select a valid City from suggestions.", {
        variant: "warning",
      });
      return;
    }

    enqueueSnackbar("Searching hospitals...", { variant: "success" });
    setDisplayHospitalCard(true);
  };

  return (
    <form className={styles.mainContainer} onSubmit={handleSearch}>
      <div className={styles.searchState} id="state" ref={stateSuggestionsRef}>
        <img
          src={require("../../assets/locator.png")}
          alt="location"
          height="24"
          width="24"
        />
        <select
          required
          value={stateInput}
          id="state-select"
          className={styles.searchInputState}
          onChange={(e) => {
            const selectedState = e.target.value;
            handleSelectState(selectedState);
          }}
        >
          <option value="">Select State</option>
          {allStates.map((state, index) => (
            <option key={index} value={state}>
              <ul style={{ listStyle: "none" }}>
                <li>{state}</li>
              </ul>
            </option>
          ))}
        </select>
      </div>

      <div className={styles.searchCity} id="city" ref={citySuggestionsRef}>
        <img
          src={require("../../assets/locator.png")}
          alt="location"
          height="24"
          width="24"
        />
        <select
          required
          value={cityInput}
          id="city-select"
          className={styles.searchInputCity}
          onChange={(e) => {
            const selectedCity = e.target.value;
            handleSelectCity(selectedCity);
          }}
        >
          <option value="">Select City</option>
          {allCities.map((city, index) => (
            <option key={index} value={city}>
              <ul style={{ listStyle: "none" }}>
                <li>{city}</li>
              </ul>
            </option>
          ))}
        </select>
      </div>
      <button className={styles.btnSearch} type="submit" id="searchBtn">
        <img
          src={require("../../assets/search-icn-white.png")}
          alt="search"
          width="20"
          height="20"
        />
        Search
      </button>
    </form>
  );
}
