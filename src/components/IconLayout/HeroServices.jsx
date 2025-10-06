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

  const navigate = useNavigate();

  const stateSuggestionsRef = useRef(null);
  const citySuggestionsRef = useRef(null);

  // Fetch all states once on mount
  useEffect(() => {
    axios
      .get("https://meddata-backend.onrender.com/states")
      .then((res) => setAllStates(res.data))
      .catch((err) => console.error("Error fetching States: ", err));
  }, []);




  const handleSelectState = (state) => {
    setStateInput(state);
    setCityInput("");
    axios
      .get(`https://meddata-backend.onrender.com/cities/${state}`)
      .then((res) => setAllCities(res.data))
      .catch((err) => console.error("Error fetching Cities: ", err));
  };

  const handleSelectCity = (city) => {
    setCityInput(city);
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
            {/* State Input */}
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
                <select
                  required
                  value={stateInput}
                  onChange={(e) => {
                    const selectedState = e.target.value;
                    handleSelectState(selectedState);
                  }}
                >
                      <option value="">Select State</option>

                      {allStates.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                </select>
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
                  id="city"
                >
                  <select
                    required
                    value={cityInput}
                    onChange={(e) => {
                      const selectedCity = e.target.value;
                      handleSelectCity(selectedCity);
                    }}
                  >
                        <option value="">Select City</option>
                    {allCities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
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
