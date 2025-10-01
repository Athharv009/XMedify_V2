import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import NavBar from "../components/Navbar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import styles from "./FindDoctors.module.css";
import FAQs from "../components/Sections/FAQs/FAQs";
import Footer from "../components/Footer/Footer";

export default function FindDoctors() {
  const location = useLocation();

  const [storeState, setStoreState] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [displayHospitalCard, setDisplayHospitalCard] = useState(false);

  // Read URL params if coming from HeroServices
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const stateParam = params.get("state");
    const cityParam = params.get("city");

    if (stateParam && cityParam) {
      setStoreState(stateParam);
      setStoreCity(cityParam);
      setDisplayHospitalCard(true);
    }
  }, [location.search]);

  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div className={styles.designContainer}></div>

      <div className={styles.searchbarContent}>
        <SearchBar
          setStoreState={setStoreState}
          setStoreCity={setStoreCity}
          setDisplayHospitalCard={setDisplayHospitalCard}
          initialState={storeState}
          initialCity={storeCity}
        />
      </div>

      <div className={styles.mainContentDiv}>
        {displayHospitalCard && storeState && storeCity && (
          <HospitalCard storeState={storeState} storeCity={storeCity} />
        )}
      </div>

      <div style={{ background: "white", marginTop: "90px", paddingTop: "20px" }}>
        <FAQs />
      </div>
      <Footer />
    </div>
  );
}
