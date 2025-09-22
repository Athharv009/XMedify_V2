import IconCard from "../IconCard/IconCard";
import Offers from "../Sections/Offers/Offers";
import styles from "./HeroServices.module.css";

export default function HeroServices() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.heroServicesMain}>
        <div className={styles.servicesContainer}>
          <div className={styles.servicesMain}>
            <div className={styles.service}>
              <img
                src={require("../../assets/search-icn.png")}
                alt="search icon"
              />
              <input placeholder="State" type="text" required />
            </div>
            <div className={styles.btwInpBtn}>
              <div className={styles.service}>
                <img
                  src={require("../../assets/search-icn.png")}
                  alt="search icon"
                />
                <input placeholder="City" type="text" required />
              </div>
              <button className={styles.btnSearch}>
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
      <div className={styles.offers}>
      <Offers />
      </div>
    </div>
  );
}
