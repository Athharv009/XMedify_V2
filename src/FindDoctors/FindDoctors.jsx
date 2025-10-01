import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import NavBar from "../components/Navbar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import styles from "./FindDoctors.module.css";
import FAQs from "../components/Sections/FAQs/FAQs";
import Footer from "../components/Footer/Footer";

export default function FindDoctors() {
  const [storeState, setStoreState] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [displayHospitalCard, setDisplayHospitalCard] = useState(false);

  const location = useLocation();

  // Prefill state/city if URL params exist
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const stateParam = params.get("state") || "";
    const cityParam = params.get("city") || "";

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
          initialState={storeState}
          initialCity={storeCity}
          setStoreState={setStoreState}
          setStoreCity={setStoreCity}
          setDisplayHospitalCard={setDisplayHospitalCard}
        />
      </div>

      <div className={styles.mainContentDiv}>
        {displayHospitalCard && (
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
