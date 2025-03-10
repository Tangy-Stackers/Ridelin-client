import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, TextInput, Popover } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import axios from "axios";
import "./Booking.css";
import RideDetails from "./DetailsRide";


function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [rides, setRides] = useState([]);
    const [filteredRides, setFilteredRides] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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
        setFilteredRides(filtered);
    };

    // Handle manual search when the user types a new origin or destination and presses the search button
    const handleSearch = () => {
        filteredResult(rides, origin, destination);
        navigate(`/rides?origin=${origin}&destination=${destination}`);
    };

    const handleGoToDetails = () => {
        navigate(`/ride/${rideId}`);
    }

    return (
        <div className="searchRide">
            <div className="searchInputs">
                <TextInput
                    label="Origin"
                    value={origin || originQuery}
                    placeholder="Enter Origin"
                    onChange={(e) => setOrigin(e.target.value)} />
                <TextInput
                    label="Destination"
                    value={destination || destinationQuery}
                    placeholder="Enter Destination"
                    onChange={(e) => setDestination(e.target.value)} />
                  <Popover
                    opened={isDatePickerOpen}
                    onClose={() => setIsDatePickerOpen(false)}
                    position="bottom"
                    withArrow
                >
                    <Popover.Target>
                        <TextInput
                            label="Travel Date"
                            value={selectedDate ? selectedDate.toLocaleDateString() : ""}
                            placeholder="Select a Date"
                            onClick={() => setIsDatePickerOpen(true)} // Open on click
                            readOnly
                        />
                    </Popover.Target>
                    <Popover.Dropdown>
                        <DatePicker
                            value={selectedDate}
                            onChange={(date) => {
                                setSelectedDate(date);
                                setIsDatePickerOpen(false); // Close when date is selected
                            }}
                            classNames={{
                                calendarBase: "small-calendar",
                                day: "small-calendar-day",
                                month: "small-calendar-month",
                                weekday: "small-calendar-weekday"
                            }}
                        />
                    </Popover.Dropdown>
                </Popover>
            </div>

            <Button onClick={handleSearch}>Search</Button>

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
                            <button onClick={handleGoToDetails}> More Details </button>
                        </Card>
                    ))
                )}
                        

            </div>
           
        </div>
    );

}
export default Dashboard;