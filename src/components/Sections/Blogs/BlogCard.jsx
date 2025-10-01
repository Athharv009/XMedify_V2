import styles from "./BlogCard.module.css";

export default function BlogCard() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.blogCard}>
        <img
          src={require("../../../assets/blogCardImg.jpg")}
          alt="BlogCardImage"
          className={styles.cardImage}
        />
        <div style={{ margin: "20px" }}>
          <p>
            Medical <span> | </span> March 31, 2022
          </p>
          <span className={styles.spanDescription}>
            6 Tips To Protect Your Mental Health When You’re Sick
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              gap: "10px",
            }}
          >
            <img
              src={require("../../../assets/rebaccaLee.png")}
              alt="Rebacca Lee"
              height={"32px"}
              width={"32px"}
            />
            <span
              style={{
                fontWeight: "500",
                fontSize: "17px",
                lineHeight: "27px",
                letterSpacing: "0%",
                color: "#1B3C74",
              }}
            >
              Rebecca Lee
            </span>
          </div>
        </div>
      </div>
      <div className={styles.blogCard}>
        <img
          src={require("../../../assets/blogCardImg.jpg")}
          alt="BlogCardImage"
          className={styles.cardImage}
        />
        <div style={{ margin: "20px" }}>
          <p>
            Medical <span> | </span> March 31, 2022
          </p>
          <span className={styles.spanDescription}>
            6 Tips To Protect Your Mental Health When You’re Sick
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              gap: "10px",
            }}
          >
            <img
              src={require("../../../assets/rebaccaLee.png")}
              alt="Rebacca Lee"
              height={"32px"}
              width={"32px"}
            />
            <span
              style={{
                fontWeight: "500",
                fontSize: "17px",
                lineHeight: "27px",
                letterSpacing: "0%",
                color: "#1B3C74",
              }}
            >
              Rebecca Lee
            </span>
          </div>
        </div>
      </div>
      <div className={styles.blogCard}>
        <img
          src={require("../../../assets/blogCardImg.jpg")}
          alt="BlogCardImage"
          className={styles.cardImage}
        />
        <div style={{ margin: "20px" }}>
          <p>
            Medical <span> | </span> March 31, 2022
          </p>
          <span className={styles.spanDescription}>
            6 Tips To Protect Your Mental Health When You’re Sick
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              gap: "10px",
            }}
          >
            <img
              src={require("../../../assets/rebaccaLee.png")}
              alt="Rebacca Lee"
              height={"32px"}
              width={"32px"}
            />
            <span
              style={{
                fontWeight: "500",
                fontSize: "17px",
                lineHeight: "27px",
                letterSpacing: "0%",
                color: "#1B3C74",
              }}
            >
              Rebecca Lee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
