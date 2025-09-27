import { useEffect, useState, useRef } from "react";
import styles from "./SearchBar.module.css";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";

export default function SearchBar() {
  const [stateInput, setStateInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [suggestionsState, setSuggestionsState] = useState([]);
  const [suggestionsCity, setSuggestionsCity] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleInputChangeState = (e) => {
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

  const handleInputChangeCity = (e) => {
    setCityInput(e.target.value);
  };

  const handleSelectCity = (city) => {
    setCityInput(city);
    setSuggestionsCity([]); // Clear suggestions after selection
  };

  let navigateTrue = false;

  if (stateInput === suggestionsState && cityInput === suggestionsCity) {
    navigateTrue = true;
  } else {
    navigateTrue = false;
  }

  const handleSearch = () => {
    if (navigateTrue) {
        
    }
  };

  return (
    <form className={styles.mainContainer}>
      <div className={styles.searchState}>
        <img
          src={require("../../assets/locator.png")}
          alt="location"
          height={"24px"}
          width={"24px"}
        />
        <input
          type="text"
          placeholder="State"
          className={styles.searchInputState}
          onChange={handleInputChangeState}
          value={stateInput}
          required
        />
        {(loading || suggestionsState.length > 0) && (
          <ul className={styles.suggestionsList}>
            {loading ? (
              <li className={styles.loadingMessage}>Loading...</li>
            ) : (
              suggestionsState.map((state, index) => (
                <li key={index} onClick={() => handleSelectState(state)}>
                  {state}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <div className={styles.searchCity}>
        <img
          src={require("../../assets/locator.png")}
          alt="location"
          height={"24px"}
          width={"24px"}
        />
        <input
          type="text"
          placeholder="City"
          className={styles.searchInputCity}
          onChange={handleInputChangeCity}
          value={cityInput}
          required
        />
        {(loading || suggestionsCity.length > 0) && (
          <ul className={styles.suggestionsList}>
            {loading ? (
              <li className={styles.loadingMessage}>Loading...</li>
            ) : (
              suggestionsCity.map((city, index) => (
                <li key={index} onClick={() => handleSelectCity(city)}>
                  {city}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <button 
      className={styles.btnSearch}
      onClick={handleSearch}
      >
        <img
          src={require("../../assets/search-icn-white.png")}
          alt="search"
          width={"20px"}
          height={"20px"}
        />
        Search
      </button>
    </form>
  );
}
