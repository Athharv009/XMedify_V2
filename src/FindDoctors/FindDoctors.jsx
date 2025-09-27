import NavBar from "../components/Navbar/NavBar";
import SearchBar from "../components/SearchBar/SearchBar";
import styles from "./FindDoctors.module.css";

export default function FindDoctors() {
  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div className={styles.designContainer}></div>
      <div className={styles.searchbarContent}>
        <SearchBar />
      </div>
      <div className={styles.mainContentDiv}>
        
      </div>
    </div>
  );
}
