import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, TextInput, Popover } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import axios from "axios";
import "../assets/Booking.css"
import SearchRide from "./SearchRide";


function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();

    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [rides, setRides] = useState([]);
    const [filteredRides, setFilteredRides] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const queryParams = new URLSearchParams(location.search);
    const originQuery = queryParams.get("origin");
    const destinationQuery = queryParams.get("destination");

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${API_URL}/api/ride`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setRides(response.data);
                filteredResult(response.data, originQuery, destinationQuery);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const filteredResult = (ridesData, originFilter, destinationFilter) => {
        console.log(ridesData)
        const filtered = ridesData
            .filter(ride =>
                ride.origin.toLowerCase().includes(originFilter.toLowerCase()) &&
                ride.destination.toLowerCase().includes(destinationFilter.toLowerCase()) &&
                (selectedDate ? new Date(ride.travelDate) >= new Date(selectedDate) : true)
            )
            .sort((a, b) =>
                sortOrder === "asc"
                    ? new Date(a.travelDate) - new Date(b.travelDate)
                    : new Date(b.travelDate) - new Date(a.travelDate)
            );
            console.log(filtered)
        setFilteredRides(filtered);

    };

    

    const handleGoToDetails = (rideId) => {
        navigate(`/ride/${rideId}`);
    }

    return (
        <div className="searchRide">

            <SearchRide />

            <div>
                <label>Sort by Date:</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Earliest First</option>
                    <option value="desc">Latest First</option>
                </select>
            </div>
            <div className="rideResults">
                {filteredRides.length === 0 ? (
                    <p>No rides found for your search.</p>
                ) : (
                    filteredRides.map((ride) => (
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
export default SearchResults;