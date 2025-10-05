import { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import SearchHospital from "../SearchHospital/SearchHospital";
import styles from "./BookingModal.module.css";
import Footer from "../Footer/Footer";

const BookingCard = ({
  hospitalName,
  address,
  city,
  state,
  zipCode,
  rating,
  hospitalType,
  date,
  time,
}) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <div className={styles.mainCard}>
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
              <span style={{ fontWeight: "700", fontStyle: "Bold" }}>
                {address}
                <br />
                {city}, {state} <br /> {zipCode}
              </span>
              <span style={{ color: "#414146" }}>{hospitalType}</span>
              <span style={{ color: "#414146" }}>more</span>
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
            <div className={styles.dateTime}>
              <text name="time" id="time" className={styles.time} disabled>
                {time}
              </text>
              <text name="date" id="date" className={styles.date} disabled>
                {formattedDate}
              </text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BookingModal() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
    setFilteredBookings(stored);
  }, []);
  
  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredBookings(bookings);
      return;
    }

    const filtered = bookings.filter((booking) =>
      booking.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  };

  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div className={styles.designContainer}></div>

      <div className={styles.myBookingsContainer}>
        <h1>My Bookings</h1>
        <div className={styles.searchInp}>
          <SearchHospital
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
        </div>
      </div>

      <div className={styles.mainContent}>
        {filteredBookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <div className={styles.hostpitalcard}>
            {filteredBookings.map((booking, index) => (
              <BookingCard
                key={index}
                hospitalName={booking.HospitalName}
                hospitalType={booking.HospitalType}
                address={booking.Address}
                city={booking.City}
                state={booking.State}
                zipCode={booking.ZipCode}
                rating={booking.Rating}
                date={booking.Date}
                time={booking.Time}
              />
            ))}
          </div>
        )}
        <div className={styles.advertiseDiv}>
          <img
            src={require("../../assets/advertise.png")}
            alt="Advertisement"
            className={styles.advertise}
          />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
