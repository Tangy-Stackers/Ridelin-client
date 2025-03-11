import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import axios from "axios";
import { Link, useParams,useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

function RideDetails() {
  const [ride, setRide] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); 
  const {rideId} =useParams();
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
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


  //booking
//   const handleGoToDetails = (rideId) => {
//     navigate(`/ride/${rideId}`);
// }

  return (
    <div>
      <h1>Ride Details</h1>
      {ride === null ? (
        <p>ride not found </p>
      ) : (
      <div key={ride._id}>
        <h3>Origin: {ride.origin}</h3>
        <h3>Destination: {ride.destination}</h3>
        {/* <button >Book this ride</button> needs to handlesumitbooking */}

        {userId === ride.driverId && (
            <button onClick={()=>{handleDelete()}}>Delete this ride</button>
          )}
        
      </div>
      )}
    </div>
  );
}

export default RideDetails;
