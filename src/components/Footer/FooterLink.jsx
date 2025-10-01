import styles from "./FooterLink.module.css";
import styleOfNavbar from "../Navbar/NavBar.module.css";
export default function FooterLink() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.icons}>
          <div className={styleOfNavbar.medify}>
            <div
              style={{
                background: "#2AA8FF",
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
            >
              <img
                src={require("../../assets/vector.png")}
                alt="logo"
                height={"14px"}
                width={"14px"}
              />
            </div>
            <span
              style={{
                fontSize: "24px",
                font: "poppins, sans serif",
                letterSpacing: "20%",
                lineHeight: "100%",
                fontWeight: "700",
              }}
            >
              Medify
            </span>
          </div>
          <div className={styles.iconList}>
            <img
              src={require("../../assets/fb.png")}
              alt="facebook"
              width={"35.2px"}
              height={"35.2px"}
              style={{ borderRadius: "17.6px", objectFit: "cover" }}
            />
            <img
              src={require("../../assets/twit.png")}
              alt="twitter"
              width={"35.2px"}
              height={"35.2px"}
              style={{ borderRadius: "17.6px", objectFit: "cover" }}
            />
            <img
              src={require("../../assets/yt.png")}
              alt="youtube"
              width={"35.2px"}
              height={"35.2px"}
              style={{ borderRadius: "17.6px", objectFit: "cover" }}
            />
            <img
              src={require("../../assets/pinterest.png")}
              alt="pinterest"
              width={"35.2px"}
              height={"35.2px"}
              style={{ borderRadius: "17.6px", objectFit: "cover" }}
            />
          </div>
        </div>
        <div className={styles.lists}>
          <ul>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              About Us
            </li>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Our Pricing
            </li>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Our Gallery
            </li>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Appointment
            </li>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className={styles.lists}>
          <ul>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Orthology
            </li>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Neurology
            </li>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Dental Care
            </li>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Opthalmology
            </li>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Cardiology
            </li>
          </ul>
        </div>
        <div className={styles.lists}>
          <ul>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              About Us
            </li>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Our Pricing
            </li>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Our Gallery
            </li>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Appointment
            </li>
            <li>
              <img
                src={require("../../assets/arrow.png")}
                alt="arrow"
                className={styles.listArrows}
              />
              Privacy Policy
            </li>
          </ul>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p
          style={{
            color: "#FFFFFF",
            borderTop: "1px solid #FFFFFF1A",
            width: "80%",
            padding: "30px",
            margin: "0px",
          }}
        >
          Copyright ©2023 Surya Nursing Home.com. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
