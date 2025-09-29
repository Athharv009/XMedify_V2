import { useState } from "react";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import NavBar from "../components/Navbar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import styles from "./FindDoctors.module.css";

export default function FindDoctors() {
  // ✅ Lifted state to parent
  const [storeState, setStoreState] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [displayHospitalCard, setDisplayHospitalCard] = useState(false);

  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div className={styles.designContainer}></div>

      <div className={styles.searchbarContent}>
        {/* ✅ Pass setter functions to SearchBar */}
        <SearchBar
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
    </div>
  );
}
