import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import axios from "axios";
// import "./Booking.css";
import { useNavigate } from "react-router-dom";

function AvailableRides() {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();


  const getAllRides = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/ride`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRides(response.data))
      .catch((error) => console.log(error));
  };
const handleGoToDetails = (rideId) => {
  navigate(`/ride/${rideId}`);
};
  useEffect(() => {
    getAllRides();
  }, []);

  return (
    <div >
       <h1> Welcome to Ridelin</h1>
       <h3>The Future of Commuting: Share a Ride, Make a Difference</h3>
        {rides.length === 0 ? (
        <p>No rides available</p> ) : (
          rides.map((ride) => (
        <div key={ride._id}>
            <label >
              <h3> Ride_id: {ride._id} </h3>
              <h3>Origin:{ride.passengerId}</h3> 
              <h3>Destination:{ride.passengerId}</h3>
         
          <button onClick={handleGoToDetails}> Read Details </button>
          </label>
        </div>
      ))
      )}
    
    </div>
  );
}

export default AvailableRides;