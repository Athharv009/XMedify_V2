import { useEffect, useState, useRef } from "react";
import IconCard from "../IconCard/IconCard";
import styles from "./HeroServices.module.css";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce"; // Import the custom hook
import { useNavigate } from "react-router";

export default function HeroServices() {
  const [stateInput, setStateInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [suggestionsState, setSuggestionsState] = useState([]);
  const [suggestionsCity, setSuggestionsCity] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const debouncedInputState = useDebounce(stateInput, 500); // 500ms debounce delay
  const debouncedInputCity = useDebounce(cityInput, 500); // 500ms debounce delay

  const stateSuggestionsRef = useRef(null);
  const citySuggestionsRef = useRef(null);

  // Close state suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        stateSuggestionsRef.current &&
        !stateSuggestionsRef.current.contains(event.target)
      ) {
        setSuggestionsState([]);
        setSuggestionsCity([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close city suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        citySuggestionsRef.current &&
        !citySuggestionsRef.current.contains(event.target)
      ) {
        setSuggestionsCity([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch states
  useEffect(() => {
    if (debouncedInputState.length > 0) {
      setLoading(true);
      axios
        .get(`https://meddata-backend.onrender.com/states`)
        .then((res) => {
          const filtered = res.data.filter((item) =>
            item.toLowerCase().startsWith(debouncedInputState.toLowerCase())
          );
          setSuggestionsState(filtered);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching States: ", err);
          setLoading(false);
        });
    } else {
      setSuggestionsState([]);
    }
  }, [debouncedInputState]);

  const handleStateInputChange = (e) => {
    setStateInput(e.target.value);
  };

  const handleSelectState = (state) => {
    setStateInput(state);
    setSuggestionsState([]); // Clear suggestions after selection
  };

  // Fetch cities for selected state
  useEffect(() => {
    if (debouncedInputCity.length > 0 && stateInput.trim() !== "") {
      setLoading(true);
      axios
        .get(`https://meddata-backend.onrender.com/cities/${stateInput}`)
        .then((res) => {
          const filtered = res.data.filter((item) =>
            item.toLowerCase().startsWith(debouncedInputCity.toLowerCase())
          );
          setSuggestionsCity(filtered);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching Cities: ", err);
          setLoading(false);
        });
    } else {
      setSuggestionsCity([]);
    }
  }, [debouncedInputCity, stateInput]);

  const handleCityInputChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleSelectCity = (city) => {
    setCityInput(city);
    setSuggestionsCity([]); // Clear suggestions after selection
  };

  let navigateTrue = false;

  if(stateInput && cityInput) {
    navigateTrue = true;
  }
  else {
    navigateTrue = false;
  }

  const handleSearch = () => {
    if(navigateTrue) {
      navigate('/find-doctors')
    }
  }

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
              <div className={styles.autocompleteWrapper} ref={stateSuggestionsRef}>
                <input
                  placeholder="State"
                  type="text"
                  required
                  onChange={handleStateInputChange}
                  value={stateInput}
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
                <div className={styles.autocompleteWrapper} ref={citySuggestionsRef}>
                  <input
                    placeholder="City"
                    type="text"
                    required
                    onChange={handleCityInputChange}
                    value={cityInput}
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
