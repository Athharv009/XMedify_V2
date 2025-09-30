import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./HospitalCard.module.css";

const Card = ({
  hospitalName,
  address,
  city,
  state,
  zipCode,
  rating,
  hospitalType,
}) => {
  const [bookingClick, setBookingClick] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleConfirm = () => {
    alert(`Booking confirmed on ${selectedDate} at ${selectedSlot}`);
  };

  return (
    <div className={styles.mainCardDi}>
      <div
        className={`${styles.mainCard} ${
          bookingClick ? styles.openBooking : null
        }`}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              background: "#8CCFFF",
              width: "124px",
              height: "124px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "1",
            }}
          >
            <img
              src={require("../../assets/hospital.png")}
              alt="Medical Center"
              height={"80px"}
              width={"80px"}
            />
          </div>
          <img
            src={require("../../assets/ticking.png")}
            alt="Ticking"
            width={"20px"}
            height={"20px"}
            style={{
              zIndex: "2",
              position: "relative",
              marginLeft: "-15px",
              marginTop: "80px",
            }}
          />
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.textContent}>
            <h3>{hospitalName}</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontWeight: "700",
                  fontStyle: "Bold",
                  marginTop: "20px",
                }}
              ></span>
              <span
                style={{
                  fontWeight: "700",
                  fontStyle: "Bold",
                }}
              >
                {address}
                <br />
                {city}, {state} <br /> {zipCode}
              </span>
              <span style={{ color: "#414146" }}>{hospitalType}</span>
              <span style={{ color: "#414146" }}>more</span>
              <span style={{ marginTop: "8px" }}>
                <span
                  style={{
                    color: "#02A401",
                    fontWeight: "700",
                    font: "poppins, sans-serif",
                    fontStyle: "bold",
                    fontSize: "14px",
                  }}
                >
                  FREE
                </span>{" "}
                <span
                  style={{
                    textDecoration: "line-through",
                    fontWeight: "400",
                    color: "#787887",
                  }}
                >
                  ₹500{" "}
                </span>
                <span
                  style={{
                    color: "#414146",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Consultation free at clinic
                </span>
              </span>
            </div>
            <div
              style={{
                width: "44.08px",
                height: "22.5px",
                background: "#00A500",
                borderRadius: "3.5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2px",
                marginTop: "20px",
              }}
            >
              <img
                src={require("../../assets/likes.png")}
                alt="likes"
                width={"14px"}
                height={"14px"}
              />
              <span
                style={{
                  color: "white",
                  opacity: "50%",
                  fontSize: "14px",
                  font: "lato, sans-serif",
                  fontWeight: "700",
                }}
              >
                {rating}
              </span>
            </div>
          </div>
          <div className={styles.bookCenter}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  font: "poppins, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#01A400",
                  lineHeight: "19.6px",
                }}
              >
                Available Today
              </p>
              <button
                style={{
                  width: "212px",
                  height: "40px",
                  borderRadius: "4px",
                  border: "1px solid #14BEF0",
                  background: "#2AA7FF",
                  color: "white",
                }}
                onClick={() => setBookingClick(true)}
              >
                Book FREE Center Visit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${bookingClick ? styles.bookingOpen : null}`}>
        {/* Booking Section */}
{bookingClick && (
  <div className={styles.bookingContent}>
    <h3 className={styles.bookingTitle}>Book Your Appointment</h3>

    {/* Calendar (next 7 days) */}
    <div className={styles.dateTabs}>
      {[...Array(7)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dayName = date.toLocaleDateString("en-US", {
          weekday: "short",
        });
        const dayNum = date.getDate();
        const month = date.toLocaleDateString("en-US", { month: "short" });

        const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD

        return (
          <button
            key={dateKey}
            className={`${styles.dateTab} ${
              selectedDate === dateKey ? styles.activeTab : ""
            }`}
            onClick={() => setSelectedDate(dateKey)}
          >
            <div>{i === 0 ? "Today" : i === 1 ? "Tomorrow" : `${dayName}, ${dayNum} ${month}`}</div>
            <span className={styles.slotsAvailable}>
              {Math.floor(Math.random() * 10) + 10} Slots Available
            </span>
          </button>
        );
      })}
    </div>

    {/* Time Slots */}
    {selectedDate && (
      <div className={styles.timeSlots}>
        <div className={styles.slotGroup}>
          <h4>Morning</h4>
          <div className={styles.slotGrid}>
            {["09:30 AM", "10:00 AM", "11:30 AM"].map((slot) => (
              <button
                key={slot}
                className={`${styles.slotBtn} ${
                  selectedSlot === slot ? styles.active : ""
                }`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.slotGroup}>
          <h4>Afternoon</h4>
          <div className={styles.slotGrid}>
            {["12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM", "02:30 PM"].map(
              (slot) => (
                <button
                  key={slot}
                  className={`${styles.slotBtn} ${
                    selectedSlot === slot ? styles.active : ""
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              )
            )}
          </div>
        </div>

        <div className={styles.slotGroup}>
          <h4>Evening</h4>
          <div className={styles.slotGrid}>
            {["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"].map((slot) => (
              <button
                key={slot}
                className={`${styles.slotBtn} ${
                  selectedSlot === slot ? styles.active : ""
                }`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* Confirm Button */}
    {selectedDate && selectedSlot && (
      <button className={styles.confirmBtn} onClick={handleConfirm}>
        Confirm Booking
      </button>
    )}
  </div>
)}

      </div>
    </div>
  );
};

export default function HospitalCard({ storeState, storeCity }) {
  const [medicalCenters, setMedicalCenters] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://meddata-backend.onrender.com/data?state=${storeState}&city=${storeCity}`
      )
      .then((res) => {
        setMedicalCenters(res.data);
      })
      .catch((err) => {
        console.error("Error to fetch Medical Centers: ", err);
      });
  }, [storeState, storeCity]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.contentText}>
        <h2>
          {medicalCenters.length} medical centers available in {storeState}
        </h2>
        <div className={styles.contentdivBooking}>
          <img
            src={require("../../assets/tickMark.png")}
            alt="TickMark"
            height={"22px"}
            width={"23.81px"}
          />
          <p style={{ color: "#787887" }}>
            Book appointments with minimum wait-time & verified doctor details
          </p>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.hostpitalcard}>
          {medicalCenters.map((center, id) => (
            <Card
              key={id}
              hospitalName={center["Hospital Name"]}
              hospitalType={center["Hospital Type"]}
              address={center["Address"]}
              city={center["City"]}
              state={center["State"]}
              zipCode={center["ZIP Code"]}
              rating={center["Hospital overall rating"]}
              //   onBook={() => handleBook(center)}
            />
          ))}
        </div>
        <div className={styles.advertiseDiv}>
          <img
            src={require("../../assets/advertise.png")}
            alt="Advertisement"
            className={styles.advertise}
          />
        </div>
      </div>
    </div>
  );
}
