import FindDoctors from './FindDoctors/FindDoctors';
import Home from './Home/Home';
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/find-doctors' element={<FindDoctors/>} />
    </Routes>
  );
}

export default App;
