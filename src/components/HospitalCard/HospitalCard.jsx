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
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings"));
    if (!Array.isArray(saved)) {
      localStorage.setItem("bookings", JSON.stringify([]));
    }
  }, []);

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) return;

    const booking = {
      id: Date.now(),
      hospitalName,
      address,
      city,
      state,
      zipCode,
      rating,
      hospitalType,
      date: selectedDate,
      time: selectedSlot,
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    existingBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    // reset UI
    setBookingClick(false);
    setSelectedDate("");
    setSelectedSlot("");
  };

  return (
    <div className={styles.mainCardDiv}>
      <div className={`${styles.mainCard} ${bookingClick ? styles.openBooking : ""}`}>
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
            <img src={require("../../assets/hospital.png")} alt="Medical Center" height={"80px"} width={"80px"} />
          </div>
          <img
            src={require("../../assets/ticking.png")}
            alt="Ticking"
            width={"20px"}
            height={"20px"}
            style={{ zIndex: "2", position: "relative", marginLeft: "-15px", marginTop: "80px" }}
          />
        </div>

        <div className={styles.secondContainer}>
          <div className={styles.textContent}>
            <h3>{hospitalName}</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: "700", fontStyle: "Bold", marginTop: "20px" }} />
              <span style={{ fontWeight: "700", fontStyle: "Bold" }}>
                {address}
                <br />
                {city}, {state} <br /> {zipCode}
              </span>
              <span style={{ color: "#414146" }}>{hospitalType}</span>
              <span style={{ color: "#414146" }}>more</span>
              <span style={{ marginTop: "8px" }}>
                <span style={{ color: "#02A401", fontWeight: "700", fontStyle: "bold", fontSize: "14px" }}>FREE</span>{" "}
                <span style={{ textDecoration: "line-through", fontWeight: "400", color: "#787887" }}>₹500 </span>
                <span style={{ color: "#414146", fontWeight: "400", fontSize: "14px" }}>Consultation free at clinic</span>
              </span>
            </div>

            <div style={{ width: "44.08px", height: "22.5px", background: "#00A500", borderRadius: "3.5px", display: "flex", justifyContent: "center", alignItems: "center", gap: "2px", marginTop: "20px" }}>
              <img src={require("../../assets/likes.png")} alt="likes" width={"14px"} height={"14px"} />
              <span style={{ color: "white", opacity: "50%", fontSize: "14px", fontWeight: "700" }}>{rating}</span>
            </div>
          </div>

          <div className={styles.bookCenter}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{ font: "poppins, sans-serif", fontSize: "14px", fontWeight: "500", color: "#01A400", lineHeight: "19.6px" }}>Available Today</p>
              <button
                style={{ width: "212px", height: "40px", borderRadius: "4px", border: "1px solid #14BEF0", background: "#2AA7FF", color: "white" }}
                onClick={() => setBookingClick(true)}
              >
                Book FREE Center Visit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`${bookingClick ? styles.bookingOpen : ""}`}>
        {bookingClick && (
          <div className={styles.bookingContent}>
            <h3 className={styles.bookingTitle}>Book Your Appointment</h3>

            <div className={styles.dateTabsWrapper}>
              <button className={styles.arrowBtn} onClick={() => setStartIndex(Math.max(0, startIndex - 3))} disabled={startIndex === 0}>
                <img src={require("../../assets/leftArrow.png")} alt="Left Arrow" width={"20px"} height={"20px"} />
              </button>

              <div className={styles.dateTabs}>
                {[...Array(7)].slice(startIndex, startIndex + 3).map((_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + (i + startIndex));
                  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                  const dayNum = date.getDate();
                  const month = date.toLocaleDateString("en-US", { month: "short" });
                  const dateKey = date.toISOString().split("T")[0];

                  return (
                    <button key={dateKey} className={`${styles.dateTab} ${selectedDate === dateKey ? styles.activeTab : ""}`} onClick={() => setSelectedDate(dateKey)}>
                      <p>{i + startIndex === 0 ? "Today" : i + startIndex === 1 ? "Tomorrow" : `${dayName}, ${dayNum} ${month}`}</p>
                      <span className={styles.slotsAvailable}>{Math.floor(Math.random() * 10) + 10} Slots Available</span>
                    </button>
                  );
                })}

                <div
                  className={styles.activeUnderline}
                  style={{
                    transform: `translateX(${[...Array(7)].slice(startIndex, startIndex + 3).findIndex((_, i) => {
                      const d = new Date();
                      d.setDate(d.getDate() + (i + startIndex));
                      return d.toISOString().split("T")[0] === selectedDate;
                    }) * 100}%)`,
                  }}
                />
              </div>

              <button className={styles.arrowBtn} onClick={() => setStartIndex(Math.min(6, startIndex + 3))} disabled={startIndex >= 6}>
                <img src={require("../../assets/rightArrow.png")} alt="RightArrow" width={"20px"} height={"20px"} />
              </button>
            </div>

            <div style={{ marginLeft: "20px", marginRight: "20px" }}>
              {selectedDate && (
                <div className={styles.timeSlots}>
                  <div className={styles.slotGroup}>
                    <p>Morning</p>
                    <div className={styles.slotGrid}>
                      {["09:30 AM", "10:00 AM", "11:30 AM"].map((slot) => (
                        <button key={slot} className={`${styles.slotBtn} ${selectedSlot === slot ? styles.active : ""}`} onClick={() => setSelectedSlot(slot)}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.slotGroup}>
                    <p>Afternoon</p>
                    <div className={styles.slotGrid}>
                      {["12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM", "02:30 PM"].map((slot) => (
                        <button key={slot} className={`${styles.slotBtn} ${selectedSlot === slot ? styles.active : ""}`} onClick={() => setSelectedSlot(slot)}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.slotGroup}>
                    <p>Evening</p>
                    <div className={styles.slotGrid}>
                      {["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"].map((slot) => (
                        <button key={slot} className={`${styles.slotBtn} ${selectedSlot === slot ? styles.active : ""}`} onClick={() => setSelectedSlot(slot)}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedDate && selectedSlot && (
                <button className={styles.confirmBtn} onClick={handleConfirm}>
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function HospitalCard({ storeState, storeCity }) {
  const [medicalCenters, setMedicalCenters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (storeState && storeCity) {
      setLoading(true);
      axios
        .get(`https://meddata-backend.onrender.com/data?state=${storeState}&city=${storeCity}`)
        .then((res) => setMedicalCenters(res.data))
        .catch((err) => console.error("Error to fetch Medical Centers: ", err))
        .finally(() => setLoading(false));
    } else {
      setMedicalCenters([]);
    }
  }, [storeState, storeCity]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.contentText}>
        <h1>{medicalCenters.length} medical centers available in {storeCity?.toLowerCase()}</h1>
        <div className={styles.contentdivBooking}>
          <img src={require("../../assets/tickMark.png")} alt="TickMark" height={"22px"} width={"23.81px"} />
          <p style={{ color: "#787887" }}>Book appointments with minimum wait-time & verified doctor details</p>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.hostpitalcard}>
          {loading ? <p>Loading hospitals...</p> : medicalCenters.map((center, id) => (
            <Card
              key={id}
              hospitalName={center["Hospital Name"]}
              hospitalType={center["Hospital Type"]}
              address={center["Address"]}
              city={center["City"]}
              state={center["State"]}
              zipCode={center["ZIP Code"]}
              rating={center["Hospital overall rating"]}
            />
          ))}
        </div>

        <div className={styles.advertiseDiv}>
          <img src={require("../../assets/advertise.png")} alt="Advertisement" className={styles.advertise} />
        </div>
      </div>
    </div>
  );
}
