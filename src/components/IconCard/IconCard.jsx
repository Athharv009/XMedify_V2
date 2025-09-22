import styles from "./IconCard.module.css";

export default function IconCard() {
  return (
    <div className={styles.iconCardSection}>
      <div style={{ color: "#102851", fontSize: "20px", fontWeight: "500" }}>
        You may be looking for
      </div>
      <div className={styles.cardSection}>
        <div className={styles.card}>
          <img
            src={require("../../assets/doctor-icn.png")}
            alt="Doctor"
            width={"60px"}
            height={"60px"}
          />
          <span>Doctors</span>
        </div>
        <div className={styles.card}>
          <img
            src={require("../../assets/labs-icn.png")}
            alt="Lab"
            width={"60px"}
            height={"60px"}
          />
          <span>Labs</span>
        </div>
        <div className={styles.card}>
          <img
            src={require("../../assets/hospitals-icn.png")}
            alt="Hospital"
            width={"60px"}
            height={"60px"}
          />
          <span>Hospitals</span>
        </div>
        <div className={styles.card}>
          <img
            src={require("../../assets/medicalStore-icn.png")}
            alt="Medical Store"
            width={"60px"}
            height={"60px"}
          />
          <span>Medical Store</span>
        </div>
        <div className={styles.card}>
          <img
            src={require("../../assets/ambulance-icn.png")}
            alt="Ambulance"
            width={"60px"}
            height={"60px"}
          />
          <span>Ambulance</span>
        </div>
      </div>
    </div>
  );
}
