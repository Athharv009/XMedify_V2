import FindDoctors from "./FindDoctors/FindDoctors";
import Home from "./Home/Home";
import { Routes, Route } from "react-router";
import MyBookings from "./MyBookings/MyBookings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/find-doctors" element={<FindDoctors />} />
      <Route path="/my-bookings" element={<MyBookings />} />
    </Routes>
  );
}

export default App;
