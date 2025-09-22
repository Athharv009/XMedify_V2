import HeroServices from "../IconLayout/HeroServices";
import NavBar from "../Navbar/NavBar";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <div>
      <div className={styles.HeroSection}>
        <div>
          <NavBar />
        </div>
        <div>
          <div className={styles.hero}>
            <div className={styles.tagHero}>
              <h2>
                Skip the travel! Find Online <br />
                <span className={styles.h1}>
                  Medical <span style={{ color: "#2AA7FF" }}>Centers</span>
                </span>
              </h2>
              <p>
                Connect instantly with a 24x7 specialist or choose to video
                visit a particular doctor.
              </p>
              <button>Find Centers</button>
            </div>
            <div>
              <div className={styles.heroImage}>
                <img
                  src={require("../../assets/hero-img.png")}
                  alt="heroImage"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heroServices}>
          <HeroServices />
        </div>
      </div>
    </div>
  );
}
