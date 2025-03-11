import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card, TextInput, Popover } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import axios from "axios";
import "../assets/Booking.css"
import SearchRide from "../components/SearchRide";



//show booking rides

function DashBoardPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [rides, setRides] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${API_URL}/api/ride`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setRides(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },[]);

    

    const handleGoToDetails = (rideId) => {
        navigate(`/ride/${rideId}`);
    }

    return (
        <div className="searchRide">

            <SearchRide />

            
            <div className="rideResults">
                {rides.length === 0 ? (
                    <p>No rides found for your search.</p>
                ) : (
                    rides.map((ride) => (
                        <Card key={ride._id} className="rideCard">
                            <h3>Ride ID: {ride._id}</h3>
                            <p>Origin: {ride.origin}</p>
                            <p>Destination: {ride.destination}</p>
                            <p>Travel Date: {new Date(ride.travelDate).toLocaleString()}</p>
                            <p>Driver: {ride.driverId}</p>
                            <button onClick={()=>{handleGoToDetails(ride._id)}}> More Details </button>
                        </Card>
                    ))
                )}
                        
            </div>
           
        </div>
    );

}
export default DashBoardPage;