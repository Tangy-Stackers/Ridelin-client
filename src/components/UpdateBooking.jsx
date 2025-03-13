import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/Booking.css";
import { Button, Group, Notification, Radio, TextInput } from "@mantine/core";

function UpdateBooking() {
    const [seatsBooked, setSeatsBooked] = useState("");
    const [status, setStatus] = useState("pending");
    const [boardingPoint, setBoardingPoint] = useState("");
    const [destination, setDestination] = useState("");
    const [waypoints, setWaypoints] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destinationType, setDestinationType] = useState("destination");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { bookingId } = useParams();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {

                const booking = response.data;
                console.log(booking)
                setOrigin(booking.ride.origin);
                console.log(booking.ride.origin);
                setDestination(booking.ride.destination);
                console.log(booking.ride.destination);
                setSeatsBooked(booking.seatsBooked);
                setStatus(booking.status);
                setWaypoints(booking.ride.waypoints || []);
            })
            .catch((error) => console.log(error));
    }, [bookingId]);

    const handleBoardingChange = (value) => {
        if (value === destination) {
            setErrorMessage("Boarding point and destination cannot be the same.");
        } else {
            setErrorMessage(""); // Clear error
            setBoardingPoint(value);
        }
    };

    // Handle destination change
    const handleDestinationChange = (value) => {
        if (value === boardingPoint) {
            setErrorMessage("Boarding point and destination cannot be the same.");
        } else {
            setErrorMessage(""); // Clear error
            setDestination(value);
        }
    };

    
    const handleUpdate = (e) => {
        e.preventDefault();

        console.log(boardingPoint);
        console.log(destination);
        console.log("Status: ", status);
        if (boardingPoint === destination) {
            setErrorMessage("Boarding point and destination cannot be the same.");
            return;
        }
        const requestBody = { boardingPoint, destination, status, seatsBooked };
        const storedToken = localStorage.getItem('authToken');

        axios.patch(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` }, })
            .then((response) => {
                console.log(response.data); 
                navigate(`/dashboard`)
            }).catch((error) => console.log(error));
    };



    const deleteBooking = () => {
        const storedToken = localStorage.getItem('authToken');

        axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => navigate("/dashboard"))
            .catch((error) => console.log(error));
    };



    return (
        <div className="updateBooking">
            <h3>Update Booking</h3>
            <form onSubmit={handleUpdate}>
                <label>Seats Booked:
                    <TextInput
                        value={seatsBooked} onChange={(e) => { setSeatsBooked(e.target.value) }}
                    />
                </label>
                <label>Status:
                    <select value={status} onChange={(e) => {console.log(e.target.value); setStatus(e.target.value)}}>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </label>
                {/* Boarding point (origin or waypoint) */}
                <label>Boarding at:</label>
                <Group>
                    <Radio
                        label={origin}  // Display the city name for origin
                        value="origin"
                        checked={boardingPoint === "origin"}
                        onChange={() => handleBoardingChange("origin")}
                    />
                    <Radio
                        label="Waypoint"
                        value="waypoint"
                        checked={boardingPoint === "waypoint"}
                        onChange={() => handleBoardingChange("waypoint")}
                    />
                </Group>

                {/* Dropdown to select origin or waypoint */}
                {boardingPoint === "waypoint" && (
                    <select onChange={(e) => handleBoardingChange(e.target.value)} value={boardingPoint}>
                        {waypoints.length > 0 ? (
                            waypoints.map((waypoint, index) => (
                                <option key={index} value={waypoint}>{waypoint}</option>
                            ))
                        ) : (
                            <option value="">No waypoints available</option>
                        )}
                    </select>
                )}

                {/* Destination point (destination or waypoint) */}
                <label>Destination:</label>
                <Group>
                    <Radio
                        label={destination}  // Display the city name for destination
                        value="destination"
                        checked={destinationType === "destination"}
                        onChange={() => setDestinationType("destination")}
                    />
                    <Radio
                        label="Waypoint"
                        value="waypoint"
                        checked={destinationType === "waypoint"}
                        onChange={() => setDestinationType("waypoint")}
                    />
                </Group>

                {/* Dropdown to select destination or waypoint */}
                {destinationType === "waypoint" && (
                    <select onChange={(e) => handleDestinationChange(e.target.value)} value={destination}>
                        {waypoints.length > 0 ? (
                            waypoints.map((waypoint, index) => (
                                <option key={index} value={waypoint}>{waypoint}</option>
                            ))
                        ) : (
                            <option value="">No waypoints available</option>
                        )}
                    </select>
                )}

                {/* Display error message if boarding point is the same as destination */}
                {errorMessage && (
                    <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>
                        {errorMessage}
                    </div>
                )}


                <Button variant="filled" color="indigo" type="submit">Update Booking 🛠️  </Button>
            </form>
            <Button variant="filled" color="red" onClick={deleteBooking}> Delete Booking 🗑️ </Button>

        </div>
    )
}

export default UpdateBooking;