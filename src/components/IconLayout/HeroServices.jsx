import { useEffect, useState, useRef } from "react";
import IconCard from "../IconCard/IconCard";
import styles from "./HeroServices.module.css";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router";

export default function HeroServices() {
  const [stateInput, setStateInput] = useState(
    localStorage.getItem("selectedState") || ""
  );
  const [cityInput, setCityInput] = useState(
    localStorage.getItem("selectedCity") || ""
  );
  const [suggestionsState, setSuggestionsState] = useState([]);
  const [suggestionsCity, setSuggestionsCity] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const navigate = useNavigate();

  const debouncedInputState = useDebounce(stateInput, 500);
  const debouncedInputCity = useDebounce(cityInput, 500);

  const stateSuggestionsRef = useRef(null);
  const citySuggestionsRef = useRef(null);

  // Fetch all states
  useEffect(() => {
    axios
      .get("https://meddata-backend.onrender.com/states")
      .then((res) => setAllStates(res.data))
      .catch((err) => console.error("Error fetching States: ", err));
  }, []);

  // Filter state suggestions
  useEffect(() => {
    if (debouncedInputState.length > 0) {
      const filtered = allStates.filter((item) =>
        item.toLowerCase().startsWith(debouncedInputState.toLowerCase())
      );
      setSuggestionsState(filtered);
    } else {
      setSuggestionsState([]);
    }
  }, [debouncedInputState, allStates]);

  // Filter city suggestions
  useEffect(() => {
    if (debouncedInputCity.length > 0 && allCities.length > 0) {
      const filtered = allCities.filter((item) =>
        item.toLowerCase().startsWith(debouncedInputCity.toLowerCase())
      );
      setSuggestionsCity(filtered);
    } else {
      setSuggestionsCity([]);
    }
  }, [debouncedInputCity, allCities]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        stateSuggestionsRef.current &&
        !stateSuggestionsRef.current.contains(event.target)
      )
        setSuggestionsState([]);
      if (
        citySuggestionsRef.current &&
        !citySuggestionsRef.current.contains(event.target)
      )
        setSuggestionsCity([]);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectState = (state) => {
    setStateInput(state);
    setSuggestionsState([]);
    setCityInput("");
    setSuggestionsCity([]);
    localStorage.setItem("selectedState", state); // persist state
    localStorage.removeItem("selectedCity"); // remove previous city

    axios
      .get(`https://meddata-backend.onrender.com/cities/${state}`)
      .then((res) => setAllCities(res.data))
      .catch((err) => console.error(err));
  };

  const handleSelectCity = (city) => {
    setCityInput(city);
    setSuggestionsCity([]);
    localStorage.setItem("selectedCity", city); // persist city
  };

  const handleSearch = () => {
    if (!stateInput || !cityInput) return;
    // localStorage already has values
    navigate("/find-doctors"); // navigate to HospitalCard page
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.heroServicesMain}>
        <div className={styles.servicesContainer}>
          <form className={styles.servicesMain} onSubmit={(e) => e.preventDefault()}>
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
                  value={stateInput}
                  onChange={(e) => setStateInput(e.target.value)}
                  required
                />
                {suggestionsState.length > 0 && (
                  <ul className={styles.suggestionsList}>
                    {suggestionsState.map((state, idx) => (
                      <li key={idx} onClick={() => handleSelectState(state)}>
                        {state}
                      </li>
                    ))}
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
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    required
                  />
                  {suggestionsCity.length > 0 && (
                    <ul className={styles.suggestionsList}>
                      {suggestionsCity.map((city, idx) => (
                        <li key={idx} onClick={() => handleSelectCity(city)}>
                          {city}
                        </li>
                      ))}
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
          </form>
          <IconCard />
        </div>
      </div>
    </div>
  );
}
