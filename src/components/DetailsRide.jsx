import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import axios from "axios";
import { useParams } from "react-router-dom";

function RideDetails() {
  const [ride, setRide] = useState([]);
  const {rideId} =useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/ride/${rideId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRide(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Ride Details</h1>
      {ride === null ? (
        <p>ride not found </p>
      ) : (
      <div key={ride._id}>
        <h3>Origin: {ride.origin}</h3>
        <h3>Destination: {ride.destination}</h3>
        <button>Book this ride</button>
      </div>
      )}
    </div>
  );
}

export default RideDetails;
