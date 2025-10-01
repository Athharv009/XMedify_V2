import styles from "./OurFamilies.module.css";

export default function OurFamilies() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.leftSide}>
        <span>CARING FOR THE HEALTH OF YOU AND YOUR FAMILY.</span>
        <h1>Our Families</h1>
        <p>
          We will work with you to develop individualised care plans, including
          management of chronic diseases. If we cannot assist, we can provide
          referrals or advice about the type of practitioner you require. We
          treat all enquiries sensitively and in the strictest confidence.
        </p>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.cardDivFirstCol}>
          <div className={styles.happyPatientCard}>
            <div>
              <img
                src={require("../../../assets/happyPatients.png")}
                alt="Happy Patients"
              />
              <h1>5000+</h1>
              <p>Happy Patients</p>
            </div>
          </div>
          <div className={styles.happyPatientCard}>
            <div>
              <img
                src={require("../../../assets/labrotaries.png")}
                alt="Laboratories"
              />
              <h1>1000+</h1>
              <p>Laboratories</p>
            </div>
          </div>
        </div>
        <div className={styles.cardDivSecondCol}>
          <div className={styles.happyPatientCard}>
            <div>
              <img
                src={require("../../../assets/hospitals.png")}
                alt="Hospitals"
              />
              <h1>200+</h1>
              <p>Hospitals</p>
            </div>
          </div>
          <div className={styles.happyPatientCard}>
            <div>
              <img
                src={require("../../../assets/expertDoctors.png")}
                alt="Expert Doctors"
              />
              <h1>700+</h1>
              <p>Expert Doctors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
