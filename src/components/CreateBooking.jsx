import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import { Button, TextInput, Alert } from "@mantine/core";

function CreateBooking() {
    const [users, setUsers] = useState(null);
    const [ride, setRide] = useState(null);
    const [status, setStatus] = useState("pending");
    const [bookingDate, setBookingDate] = useState("");
    const [seatsBooked, setSeatsBooked] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [canBook, setCanBook] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const userId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate();



    const { state } = useLocation(); // Get rideId from navigation state
    const selectedRideId = state?.rideId;
    console.log("Received Ride ID:", selectedRideId);

    useEffect(() => {
        if (userId) {
            axios
                .get(`${API_URL}/api/user/${userId}`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => console.log("Error fetching user:", error));
        }
    }, [userId, storedToken]);

    useEffect(() => {
        if (selectedRideId) {
            axios
                .get(`${API_URL}/api/ride/${selectedRideId}`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response) => {
                    setRide(response.data);
                    // If the logged-in user is the driver, disable booking
                    console.log(response.data.driverId._id)
                    console.log(userId)
                    if (response.data.driverId._id === userId) {

                        setCanBook(false); // Disable the booking button
                        setErrorMessage("Driver cannot be the passenger"); // Set the error message
                    }
                })
                .catch((error) => console.log("Error fetching ride:", error));
        }
    }, [selectedRideId, storedToken, userId]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!ride || !users) {
            console.log("Error: Ride or User data is missing.");
            return;
        }
        console.log(canBook)
        if (canBook === false) {
            setErrorMessage("Driver cannot be the passenger");
            return;
        }else {
        const requestBody = {
            userId,  // Send the logged-in userId instead of passengerId
            ride: ride._id,
            status,
            bookingDate,
            seatsBooked
        };
        console.log(requestBody)
        axios
            .post(`${API_URL}/api/book`, requestBody, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                setShowAlert(true);
                setTimeout(() => {
                    navigate("/"); // Redirect after 6 seconds
                }, 6000);
            })
            .catch((error) => {
                console.log("Error creating booking:", error);
            });
    };}


    return (
        <div className="createBooking">
            <h1>Create Booking</h1>
            {showAlert && (
                <Alert title="Booking Successful!" color="green" variant="filled">
                    Your booking details have been sent to your email.
                </Alert>
            )}

            {/* Display the error message if the driver tries to book */}
            {errorMessage && (
                <Alert title="Booking Error" color="red" variant="filled">
                    {errorMessage}
                </Alert>
            )}

            <label>
                <h2>Passenger details</h2>
                <p>Name:  {users?.name || "N/A"} </p>
                <p> Email: {users?.email || "N/A"}</p>
                <p> Phone Number: {users?.phone || "N/A"}</p>
            </label>

            {ride ? (
                <label>
                    <h2>Ride Details</h2>
                    <p>Ride ID: {ride._id}</p>
                    <h3>Driver details</h3>
                    <p> Name: {ride.driverId?.name || "N/A"}</p>
                    <p> Email: {ride.driverId?.email || "N/A"}</p>
                    <p> Phone: {ride.driverId?.phone || "N/A"}</p>
                    <p>Travel Date: {ride.traveldate || "N/A"}</p>
                    <p>Start Time: {ride.starttime || "N/A"}</p>
                    <p>Origin: {ride.origin || "N/A"}</p>
                    <p>Destination: {ride.destination || "N/A"}</p>
                </label>
            ) : (
                <p>Loading ride details...</p>
            )}

            {/* Disable the booking button if `canBook` is false */}
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Seats Booked"
                    placeholder="Number of Seats"
                    value={seatsBooked}
                    onChange={(e) => setSeatsBooked(e.target.value)}
                    required
                />

                <Button
                    type="submit"
                    variant="filled"
                    color="red"
                    radius="xl"
                    disabled={!canBook} // Disable button if canBook is false
                >
                    Create Booking ✏️
                </Button>
            </form>

            {!canBook && <p>You cannot book your own ride.</p>}
        </div>
    );
}

export default CreateBooking;