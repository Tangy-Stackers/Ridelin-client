import { useEffect, useState } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import axios from "axios";
import { Button } from "@mantine/core";

function RideDetails() {
  const [ride, setRide] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); 
  const {rideId} =useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
   const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
        axios
      .get(`${API_URL}/api/ride/${rideId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRide(response.data))
      .catch((error) => console.log(error));
  }, [rideId]);

  const handleDelete = () => {
        axios.delete(`${API_URL}/api/ride/${rideId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(() => {
          setSuccessMessage("Ride successfully deleted!"); // Set success message
          setTimeout(() => navigate("/"), 2000); // Redirect after 2s
        })
        .catch((error) => console.log(error));
    };

    const handleBookRide = (rideId) => {
      navigate("/book", { state: { rideId } });
  };


  return (
    <div>
      <h1>Ride Details</h1>
      {ride === null ? (
        <p>ride not found </p>
      ) : (
      <div key={ride._id}>
        <h3>Origin: {ride.origin} ----------------- Destination: {ride.destination}</h3>
        
        <h3>Driver Details:</h3>
        <p>Name: {ride.driverId?.name || "N/A"}</p>
          <p>Email: {ride.driverId?.email || "N/A"}</p>
          <p>Phone: {ride.driverId?.phone || "N/A"}</p>
          <p>Travel Date: {ride.traveldate || "N/A"}</p>
          <p>Start time: {ride.startTime || "N/A"}</p>
          <p>End time (approx): {ride.endTime || "N/A"}</p>
          <p>Distance: {ride.distance || "N/A"}</p>
        {userId === ride.driverId && (
    <button onClick={()=>{handleDelete()}}>Delete this ride</button>
  )}
 
    <Button variant="filled" color="red" radius="xl" onClick={() => handleBookRide(ride._id)}>
      Book ride</Button>
 
      </div>
      )}
    </div>
  );
}




export default RideDetails;
