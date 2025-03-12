import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card, TextInput, Popover } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/Booking.css"
import SearchRide from "./SearchRide";

function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [rides, setRides] = useState([]);
    const [filteredRides, setFilteredRides] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        doSearch();
    }, [origin, destination]);

    const doSearch = (origin, destination, date) => {
        if (origin === undefined && destination === undefined && date === undefined) {
            setOrigin(searchParams.get("origin"))
            origin = searchParams.get("origin")
            setDestination(searchParams.get("destination"))
            destination = searchParams.get("destination")
            setSelectedDate(searchParams.get('date'))
            date = searchParams.get('date')
        }

        const storedToken = localStorage.getItem('authToken');
        axios.get(`${import.meta.env.VITE_API_URL}/api/ride`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setRides(response.data);
                filteredResult(response.data, origin, destination);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const filteredResult = (rides, originFilter = "", destinationFilter = "", dateFilter = undefined) => {
        const filtered = rides
            .filter(ride =>
                ride.origin && ride.destination && // Ensure origin and destination exist
                ride.origin.toLowerCase().includes(originFilter.toLowerCase()) &&
                ride.destination.toLowerCase().includes(destinationFilter.toLowerCase()) &&
                (dateFilter ? new Date(ride.travelDate) >= new Date(dateFilter) : true)
            )
            .sort((a, b) =>
                sortOrder === "asc"
                    ? new Date(a.travelDate) - new Date(b.travelDate)
                    : new Date(b.travelDate) - new Date(a.travelDate)
            );
        setFilteredRides(filtered);
    };

    const handleGoToDetails = (rideId) => {
        navigate(`/ride/${rideId}`);
    }
    
    return (
        <div className="searchRide">
            <SearchRide originValue={origin} destinationValue={destination} dateValue={selectedDate} navigateCallback={doSearch} />
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
                            <Button color="indigo" radius="md" mt="lg" onClick={() => { handleGoToDetails(ride._id) }}> More Details </Button>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
export default SearchResults;