import { useEffect, useState, useRef } from "react";
import IconCard from "../IconCard/IconCard";
import styles from "./HeroServices.module.css";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router";

export default function HeroServices() {
  const [stateInput, setStateInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [suggestionsState, setSuggestionsState] = useState([]);
  const [suggestionsCity, setSuggestionsCity] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const debouncedInputState = useDebounce(stateInput, 500);
  const debouncedInputCity = useDebounce(cityInput, 500);

  const stateSuggestionsRef = useRef(null);
  const citySuggestionsRef = useRef(null);

  // Fetch all states on mount
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

  const handleSelectState = (state) => {
    setStateInput(state);
    setSuggestionsState([]);
    setCityInput("");
    setAllCities([]);
    // Fetch cities for this state
    axios
      .get(`https://meddata-backend.onrender.com/cities/${state}`)
      .then((res) => setAllCities(res.data))
      .catch((err) => console.error("Error fetching Cities: ", err));
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

  const handleSelectCity = (city) => {
    setCityInput(city);
    setSuggestionsCity([]);
  };

  const handleSearch = () => {
    if (!stateInput || !cityInput) return;
    navigate(
      `/find-doctors?state=${encodeURIComponent(
        stateInput
      )}&city=${encodeURIComponent(cityInput)}`
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.heroServicesMain}>
        <div className={styles.servicesContainer}>
          <div className={styles.servicesMain}>
            {/* State Input */}
            <div className={styles.service}>
              <img
                src={require("../../assets/search-icn.png")}
                alt="search icon"
              />
              <div
                className={styles.autocompleteWrapper}
                ref={stateSuggestionsRef}
              >
                <input
                  placeholder="State"
                  type="text"
                  required
                  value={stateInput}
                  onChange={(e) => setStateInput(e.target.value)}
                />
                {(loading || suggestionsState.length > 0) && (
                  <ul className={styles.suggestionsList}>
                    {loading ? (
                      <li className={styles.loadingMessage}>Loading...</li>
                    ) : (
                      suggestionsState.map((state, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectState(state)}
                        >
                          {state}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* City Input */}
            <div className={styles.btwInpBtn}>
              <div className={styles.service}>
                <img
                  src={require("../../assets/search-icn.png")}
                  alt="search icon"
                />
                <div
                  className={styles.autocompleteWrapper}
                  ref={citySuggestionsRef}
                >
                  <input
                    placeholder="City"
                    type="text"
                    required
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                  />
                  {(loading || suggestionsCity.length > 0) && (
                    <ul className={styles.suggestionsList}>
                      {loading ? (
                        <li className={styles.loadingMessage}>Loading...</li>
                      ) : (
                        suggestionsCity.map((city, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelectCity(city)}
                          >
                            {city}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
              </div>
              <button
                className={styles.btnSearch}
                type="button"
                onClick={handleSearch}
              >
                <span>
                  <img
                    src={require("../../assets/search-icn-white.png")}
                    alt="search icon"
                  />
                </span>
                Search
              </button>
            </div>
          </div>
          <IconCard />
        </div>
      </div>
    </div>
  );
}
