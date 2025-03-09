import "./index.css";
import { Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUpPage";
import HomePage from './pages/HomePage'
import LoginPage from './pages/Loginpage'
import CreateRide from "./components/CreateRide";
import DeleteRide from "./components/DeleteRide";
import DetailsRide from "./components/DetailsRide";
import SearchRide from "./components/SearchRide";
import UpdateRide from "./components/UpdateRide";
import Footer from "./components/Footer";
import CreateBooking from "./components/CreateBooking";
import Navbar from "./components/Navbar";
import ListOfBooking from "./components/ListOfBooking";
import UpdateBooking from "./components/UpdateBooking";
import ProfileDetails from "./components/ProfileDetails";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user/:userId" element={<ProfileDetails />}/>
          <Route path="/createride" element={<CreateRide />} />
          <Route path="/deleteride" element={<DeleteRide />} />
          <Route path="/ride/:rideId" element={<DetailsRide />} />
          <Route path="/searchride" element={<SearchRide />} />
          <Route path="/updateride" element={<UpdateRide />} />
          <Route path="/bookings/:bookingId" element={<UpdateBooking />} />
          <Route path="/book" element={<CreateBooking />} />
          <Route path="/bookings" element={<ListOfBooking />} />
        </Routes>
        <Footer />

      </div>
    </>
  );
}

export default App;