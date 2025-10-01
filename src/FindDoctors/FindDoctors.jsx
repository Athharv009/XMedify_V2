import { useState } from "react";
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

  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div className={styles.designContainer}></div>

      <div className={styles.searchbarContent}>
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
      <div
        style={{ background: "white", marginTop: "90px", paddingTop: "20px" }}
      >
        <FAQs />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
