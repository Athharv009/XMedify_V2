import { Link } from "react-router";
import styles from "./NavBar.module.css";
import { useState } from "react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.mainNavbarDiv}>
      <div className={styles.headerTop}>
        <p style={{ fontWeight: 400, font: "poppins, sans serif" }}>
          The health and well-being of our patients and their health care team
          will always be our priority, so we follow the best practices for
          cleanliness.
        </p>
      </div>
      <div className={styles.navbarSection}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={styles.medify}>
            <div
              style={{
                background: "#2AA8FF",
                width: "23px",
                height: "23px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <img
                src={require("../../assets/vector.png")}
                alt="logo"
                height={"11px"}
                width={"10px"}
              />
            </div>
            <span>Medify</span>
          </div>
        </Link>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </button>

        <div
          className={`${styles.tabsSection} ${
            isMenuOpen ? styles.tabsOpen : ""
          }`}
        >
          <ul className={styles.tabsList}>
            <li>
              <Link
                to="/find-doctors"
                style={{ textDecoration: "none", color: "#102851" }}
              >
                Find Doctors
              </Link>
            </li>
            <li>Hospitals</li>
            <li>Medicines</li>
            <li>Surgeries</li>
            <li>Software for Provider</li>
            <li>Facilities</li>
          </ul>
          <Link to="/my-bookings">
            <button className={styles.btnBooking}>My Bookings</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
