
import styles from "./Offers.module.css";

export default function Offers() {
  return (
    <div className={styles.mainOffersDiv}>
      <div className={styles.offersSection}>
        <div className={styles.offers}>
          <img src={require("../../../assets/offer1.png")} alt="Offer1" />
        </div>

        <div className={styles.offers}>
          <img src={require("../../../assets/offer2.png")} alt="Offer2" />
        </div>

        <div className={styles.offers}>
          <img src={require("../../../assets/offer3.png")} alt="Offer3" />
        </div>
      </div>
      <img src={require("../../../assets/swiperPagination.png")} alt="Swiper" height={"37px"}/>
    </div>
  );
}
