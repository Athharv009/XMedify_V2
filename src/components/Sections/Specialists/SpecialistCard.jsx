import styles from "./SpecialistCard.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function SpecialistCard() {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={3}
      spaceBetween={30}
      pagination={{ clickable: true }}
      breakpoints={{
        0:   { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024:{ slidesPerView: 3 },
      }}
      style={{marginBottom: "60px"}}
    >
      {/* ----- 1 ----- */}
      <SwiperSlide className={styles.swiperslider}>
        <div className={styles.specialCard}>
          <img
            src={require("../../../assets/Dr. Lesley Hull.png")}
            alt="Dr. Lesley Hull"
          />
        </div>
        <h2 className={styles.name}>Dr. Lesley Hull</h2>
        <p className={styles.spec}>Medicine</p>
      </SwiperSlide>

      {/* ----- 2 ----- */}
      <SwiperSlide className={styles.swiperslider}>
        <div className={styles.specialCard}>
          <img
            src={require("../../../assets/Dr. Ahmad Khan.png")}
            alt="Dr. Ahmad Khan"
          />
        </div>
        <h2 className={styles.name}>Dr. Ahmad Khan</h2>
        <p className={styles.spec}>Neurologist</p>
      </SwiperSlide>

      {/* ----- 3 ----- */}
      <SwiperSlide className={styles.swiperslider}>
        <div className={styles.specialCard}>
          <img
            src={require("../../../assets/Dr. Heena Sachdeva.png")}
            alt="Dr. Heena Sachdeva"
          />
        </div>
        <h2 className={styles.name}>Dr. Heena Sachdeva</h2>
        <p className={styles.spec}>Orthopedics</p>
      </SwiperSlide>

      {/* ----- 4 ----- */}
      <SwiperSlide className={styles.swiperslider}>
        <div className={styles.specialCard}>
          <img
            src={require("../../../assets/Dr. Ankur Sharma.png")}
            alt="Dr. Ankur Sharma"
          />
        </div>
        <h2 className={styles.name}>Dr. Ankur Sharma</h2>
        <p className={styles.spec}>Medicine</p>
      </SwiperSlide>

      {/* ----- 5 ----- */}
      <SwiperSlide className={styles.swiperslider}>
        <div className={styles.specialCard}>
          <img
            src={require("../../../assets/Dr. Ahmad Stevens.png")}
            alt="Dr. Ahmad Stevens"
          />
        </div>
        <h2 className={styles.name}>Dr. Ahmad Stevens</h2>
        <p className={styles.spec}>Neurologist</p>
      </SwiperSlide>
    </Swiper>
  );
}
