import { useEffect, useState, useRef } from "react";
import IconCard from "../IconCard/IconCard";
import styles from "./HeroServices.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

export default function HeroServices() {
  const [stateInput, setStateInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);

  const navigate = useNavigate();
  const stateSuggestionsRef = useRef(null);
  const citySuggestionsRef = useRef(null);

  // Fetch all states
  useEffect(() => {
    axios
      .get("https://meddata-backend.onrender.com/states")
      .then((res) => setAllStates(res.data))
      .catch((err) => console.error("Error fetching States: ", err));
  }, []);

  const handleSelectState = (state) => {
    setStateInput(state);
    setCityInput("");
    setShowStates(false);
    axios
      .get(`https://meddata-backend.onrender.com/cities/${state}`)
      .then((res) => setAllCities(res.data))
      .catch((err) => console.error("Error fetching Cities: ", err));
  };

  const handleSelectCity = (city) => {
    setCityInput(city);
    setShowCities(false);
  };

  const handleSearch = () => {
    if (stateInput && cityInput) {
      navigate(
        `/find-doctors?state=${encodeURIComponent(
          stateInput
        )}&city=${encodeURIComponent(cityInput)}`
      );
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.heroServicesMain}>
        <div className={styles.servicesContainer}>
          <form className={styles.servicesMain}>
            {/* State Dropdown */}
            <div className={styles.service}>
              <img
                src={require("../../assets/search-icn.png")}
                alt="search icon"
              />
              <div
                className={styles.autocompleteWrapper}
                ref={stateSuggestionsRef}
                id="state"
              >
                <div
                  className={styles.selectLike}
                  onClick={() => setShowStates((prev) => !prev)}
                >
                  {stateInput || "Select State"}
                </div>
                {showStates && (
                  <ul className={styles.suggestionsList}>
                    {allStates.map((state, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectState(state)}
                      >
                        {state}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* City Dropdown */}
            <div className={styles.btwInpBtn}>
              <div className={styles.service}>
                <img
                  src={require("../../assets/search-icn.png")}
                  alt="search icon"
                />
                <div
                  className={styles.autocompleteWrapper}
                  ref={citySuggestionsRef}
                  id="city"
                >
                  <div
                    className={styles.selectLike}
                    onClick={() => setShowCities((prev) => !prev)}
                  >
                    {cityInput || "Select City"}
                  </div>
                  {showCities && (
                    <ul className={styles.suggestionsList}>
                      {allCities.map((city, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectCity(city)}
                        >
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
