import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card, TextInput, Popover } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../assets/Booking.css";
import SearchRide from "../components/SearchRide";
import ListOfBooking from "../components/ListOfBooking";
import { AuthContext } from "../context/auth.context";



//show booking rides

function DashBoardPage() {
    const { user } = useContext(AuthContext);
  
    const location = useLocation();
    const navigate = useNavigate();
    const [rides, setRides] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${import.meta.env.VITE_API_URL}/api/ride`, { headers: { Authorization: `Bearer ${storedToken}` } })
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
   
      if(!user){
        navigate("/")
      }

    return (
        <div className="">

            <SearchRide />

            <ListOfBooking />

            <div className="rideResults">
                {rides.length === 0 ? (
                    <p>No rides found for your search.</p>
                ) : ( 
                    rides.map((ride) => (
                        <Card key={ride._id} className="rideCard">
                            <h3>Ride ID: {ride._id}</h3>
                            <p>Origin: {ride.origin}-----Destination: {ride.destination}</p>
                            <p>Travel Date: {new Date(ride.travelDate).toLocaleString()}</p>
                            <p>Driver: {ride.driverId}</p>
                            <Button color="indigo" radius="md" mt="lg" onClick={()=>{handleGoToDetails(ride._id)}}> More Details </Button>
                        </Card>
                    ))
                )}
                        
            </div>
           
        </div>
    );

}
export default DashBoardPage;