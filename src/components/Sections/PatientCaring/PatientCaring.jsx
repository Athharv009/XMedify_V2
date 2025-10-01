import styles from "./PatientCaring.module.css";

export default function PatientCaring() {
  return (
    <div className={styles.patientCaringMain}>
      <div className={styles.patientPic}>
        <div className={styles.patientDiv1}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={styles.callConsultation}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginBottom: "0px",
                }}
              >
                <img
                  src={require("../../../assets/call-icn.png")}
                  alt="call-icon"
                  height={"34px"}
                />
                <span
                  style={{
                    color: "#1B3C74",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Free Consultation
                </span>
              </div>
              <p
                style={{
                  color: "#77829D",
                  fontSize: "15px",
                  fontWeight: "500",
                  marginTop: "5px",
                }}
              >
                Consultation with the best
              </p>
            </div>
          </div>
          <div className={styles.patient1ImgDiv}>
            <img src={require("../../../assets/patient1.png")} alt="patient1" />
          </div>
        </div>
        <div className={styles.patientDiv2}>
          <img src={require("../../../assets/patient2.png")} alt="patient2" />
        </div>
      </div>
      <div className={styles.patientContent}>
        <p style={{ color: "#2AA7FF", fontWeight: "600", fontSize: "16px" }}>
          HELPING PATIENTS FROM AROUND THE GLOBE!!
        </p>
        <h2
          style={{
            color: "#1B3C74",
            fontSize: "48px",
            fontWeight: "600",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          Patient <span style={{ color: "#2AA7FF" }}>Caring</span>
        </h2>
        <p
          style={{
            color: "#77829D",
            fontSize: "17px",
            lineHeight: "29px",
            fontWeight: "500",
            marginBottom: "50px",
          }}
        >
          Our goal is to deliver quality of care in a courteous, respectful, and
          compassionate manner. We hope you will allow us to care for you and
          strive to be the first and best choice for healthcare.
        </p>
        <div className={styles.tickDivMain}>
          <div className={styles.tickDiv}>
            <img
              src={require("../../../assets/tick.png")}
              alt="tick"
              height={"20px"}
              width={"20px"}
            />
            <span>Stay Updated About Your Health</span>
          </div>
          <div className={styles.tickDiv}>
            <img
              src={require("../../../assets/tick.png")}
              alt="tick"
              height={"20px"}
              width={"20px"}
            />
            <span>Check Your Results Online</span>
          </div>
          <div className={styles.tickDiv}>
            <img
              src={require("../../../assets/tick.png")}
              alt="tick"
              height={"20px"}
              width={"20px"}
            />
            <span>Manage Your Appointments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
