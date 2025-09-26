import SmsForm from "./SmsForm";
import styles from "./DownloadApp.module.css";

export default function DownloadApp() {
  return (
    <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
      <div>
        <img
          src={require("../../../assets/directionArrow.png")}
          alt="DirectionArrrow"
          height={"112.35px"}
          width={"56.17px"}
          className={styles.rotateArrow}
        />
      </div>
      <div className={styles.downloadContent}>
      <div className={styles.textDownload}>
        <h2>
          Download the
          <br />
          <span style={{color: "#2AA7FF"}}>Medify</span> App
        </h2>
        <p style={{color: "#414146", marginBottom: "5px"}}>Get the link to download the app</p>
      </div>
      <SmsForm />
      <div className={styles.downloadBtn}>
      <button style={{border: "none", margin: "0px", padding: "0px"}}>
      <img
        src={require("../../../assets/googlePlay.png")}
        alt="Google Play"
        style={{
          width: "224px",
          height: "69px",
          borderRadius: "8px",
          objectFit: "cover"
        }}
      />
      </button>
      <button style={{border: "none", margin: "0px", padding: "0px"}}>
      <img
        src={require("../../../assets/appStore.png")}
        alt="App Store"
        style={{
          width: "224px",
          height: "69px",
          borderRadius: "8px",
          objectFit: "cover"
        }}
      />
      </button>
      </div>
      </div>
    </div>
  );
}
