import "./index.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUpPage";
import LoginPage from './pages/Loginpage';
import CreateRide from "./components/CreateRide";
import DetailsRide from "./components/DetailsRide";
import SearchRide from "./components/SearchRide";
import UpdateRide from "./components/UpdateRide";
import CreateBooking from "./components/CreateBooking";
import Navbar from "./components/Navbar";
import ListOfBooking from "./components/ListOfBooking";
import UpdateBooking from "./components/UpdateBooking";
import ProfileDetails from "./components/ProfileDetails";
import HomePage from "./pages/Homepage";
import SearchResultsPage from "./pages/SearchResultsPage";
import "./index.css";
import DashboardPage from "./pages/DashboardPage";
import UpdateUserProfile from "./components/UpdateUserProfile";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user/:userId" element={<ProfileDetails />}/>
          <Route path="/user/:userId/edit" element={<UpdateUserProfile/>}/>
          <Route path="/createride" element={<CreateRide />} />
          <Route path="/ride/:rideId" element={<DetailsRide />} />
          <Route path="/searchride" element={<SearchRide />} />
          <Route path="/updateride" element={<UpdateRide />} />
          <Route path="/bookings/:bookingId" element={<UpdateBooking />} />
          <Route path="/book" element={<CreateBooking />} />
          <Route path="/bookings" element={<ListOfBooking />} />
          <Route path="/rides" element={<SearchResultsPage />} />
        </Routes>
        

      </div>
    </>
  );
}

export default App;