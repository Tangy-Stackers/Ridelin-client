import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import { Button } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchRide() {

    const [rides, setRides] = useState([]);
    const [filteredRides, setFilteredRides] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const navigate = useNavigate();
    
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${API_URL}/api/ride`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setRides(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSearch = () => {
        const results = rides
            .filter(ride =>
                ride.origin.toLowerCase().includes(origin.toLowerCase()) &&
                ride.destination.toLowerCase().includes(destination.toLowerCase())
            )
            .sort((a, b) =>
                sortOrder === "asc"
                    ? new Date(a.travelDate) - new Date(b.travelDate)
                    : new Date(b.travelDate) - new Date(a.travelDate)
            );
        setFilteredRides(results);
    };
    return (
        <div className="searchRide">
            <h3>Search for a Ride</h3>
            <div className="searchInputs">
                <input type="text" value={origin} placeholder="Enter Origin" onChange={(e) => setOrigin(e.target.value)} />
                <input type="text" value={destination} placeholder="Enter Destination" onChange={(e) => setDestination(e.target.value)} />
                <Button onClick={handleSearch}>Search</Button>
            </div>
            <label>Sort by Date:</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Earliest First</option>
                <option value="desc">Latest First</option>
            </select>

            <div className="rideResults">
                {filteredRides.length === 0 ? (
                    <p>No rides found.</p>) : (
                    filteredRides.map((ride) => (
                        <div key={ride._id} className="rideCard">
                            <h3>Ride ID: {ride._id}</h3>
                            <p>Origin: {ride.origin}</p>
                            <p>Destination: {ride.destination}</p>
                            <p>Travel Date: {new Date(ride.travelDate).toLocaleString()}</p>
                            <p>Driver:{ride.driverId}</p>
                        </div>
                    ))
                )}
            </div>


        </div>

    );
}

export default SearchRide;