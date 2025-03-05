import "./index.css";
import { Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUpPage";

import CreateRide from "./components/CreateRide";
import DeleteRide from "./components/DeleteRide";
import DetailsRide from "./components/DetailsRide";
import SearchRide from "./components/SearchRide";
import UpdateRide from "./components/UpdateRide";
import Footer from "./components/Footer";


import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Homepage'
import LoginPage from './pages/Loginpage'

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createride" element={<CreateRide />} />
          <Route path="/deleteride" element={<DeleteRide />} />
          <Route path="/detailsride" element={<DetailsRide />} />
          <Route path="/searchride" element={<SearchRide />} />
          <Route path="/updateride" element={<UpdateRide />} />

        </Routes>
        <Footer />

      </div>
    </>
  );
}

export default App;