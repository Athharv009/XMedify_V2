import { useEffect, useState } from "react";
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

  // Fetch all states on mount
  useEffect(() => {
    axios
      .get(`https://meddata-backend.onrender.com/states`)
      .then((res) => setAllStates(res.data))
      .catch((err) => console.error("Error fetching States: ", err));
  }, []);

  // Fetch cities whenever a state is selected
  useEffect(() => {
    if (stateInput) {
      axios
        .get(`https://meddata-backend.onrender.com/cities/${stateInput}`)
        .then((res) => setAllCities(res.data))
        .catch((err) => console.error("Error fetching Cities: ", err));
    } else {
      setAllCities([]);
      setCityInput("");
    }
  }, [stateInput]);

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
            {/* State Select */}
            <div className={styles.service}>
              <img
                src={require("../../assets/search-icn.png")}
                alt="search icon"
              />
              <div className={styles.autocompleteWrapper} id="state">
                <select
                  value={stateInput}
                  onChange={(e) => setStateInput(e.target.value)}
                  style={{border: 'none', height: "45px"}}
                >
                  <option value="">Select State</option>
                  {allStates.map((state, idx) => (
                    <option key={idx} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* City Select */}
            <div className={styles.btwInpBtn}>
              <div className={styles.service}>
                <img
                  src={require("../../assets/search-icn.png")}
                  alt="search icon"
                />
                <div className={styles.autocompleteWrapper} id="city">
                  <select
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    disabled={!stateInput}
                    style={{border: 'none', height: "45px"}}
                  >
                    <option value="">Select City</option>
                    {allCities.map((city, idx) => (
                      <option key={idx} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                className={styles.btnSearch}
                type="button"
                id="searchBtn"
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
