import styles from "./Specialisation.module.css"

export default function Specialisation() {
    return (
        <div className={styles.specialisationMain}>
            <h1>Find By Specialisation</h1>
            <div className={styles.mainDiv}>
                <div className={styles.mainDivCard}>
                    <div className={styles.cardSpecialisation}>
                        <img src={require("../../../assets/dentistry.png")} alt="Dentistry" />
                        <span style={{ color: "#ABB6C7" }}>Dentistry</span>
                    </div>
                    <div className={styles.cardSpecialisation}>
                        <img src={require("../../../assets/primaryCare.png")} alt="Primary Care" />
                        <span style={{ color: "#ABB6C7" }}>Primary Care</span>
                    </div>
                    <div className={styles.cardSpecialisation}>
                        <img src={require("../../../assets/cardiology.png")} alt="Cardiology" />
                        <span style={{ color: "#ABB6C7" }}>Cardiology</span>
                    </div>
                    <div className={styles.cardSpecialisation}>
                        <img src={require("../../../assets/mriResonance.png")} alt="MRI Resonance" />
                        <span style={{ color: "#ABB6C7" }}>MRI Resonance</span>
                    </div>

                    <div className={styles.cardSpecialisation}>
                        <img src={require("../../../assets/bloodTest.png")} alt="Blood Test" />
                        <span style={{ color: "#ABB6C7" }}>Blood Test</span>
                    </div>
                    <div className={styles.cardSpecialisation}>
                        <img src={require("../../../assets/piscologist.png")} alt="Piscologist" />
                        <span style={{ color: "#ABB6C7" }}>Piscologist</span>
                    </div>
                    <div className={styles.cardSpecialisation}>
                        <img src={require("../../../assets/laboratory.png")} alt="Laboratory" />
                        <span style={{ color: "#ABB6C7" }}>Laboratory</span>
                    </div>
                    <div className={styles.cardSpecialisation}>
                        <img src={require("../../../assets/x-ray.png")} alt="X-Ray" />
                        <span style={{ color: "#ABB6C7" }}>X-Ray</span>
                    </div>
                </div>
            </div>
            <button>View All</button>
        </div>
    )
}