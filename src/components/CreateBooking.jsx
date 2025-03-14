import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, TextInput, Alert, Container, Text, Title, Flex, Card, Divider, Box } from "@mantine/core";
import Sidebar from "./sidebar";

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
                .get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, {
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
                .get(`${import.meta.env.VITE_API_URL}/api/ride/${selectedRideId}`, {
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
        } else {
            const requestBody = {
                userId,  // Send the logged-in userId instead of passengerId
                ride: ride._id,
                status,
                bookingDate,
                seatsBooked
            };
            console.log(requestBody)
            axios
                .post(`${import.meta.env.VITE_API_URL}/api/book`, requestBody, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then(() => {
                    setShowAlert(true);
                    setTimeout(() => {
                        navigate("/dashboard"); // Redirect after 6 seconds
                    }, 500);
                })
                .catch((error) => {
                    console.log("Error creating booking:", error);
                });
        };
    }
    const isValidDate = new Date(ride?.travelDate).toString() !== "Invalid Date";
    const travelDate = new Date(ride?.travelDate);
    const getOpacity = (value) => (value === "Not Available" || value === null || value === undefined || value === "") ? { opacity: 0.5 } : { opacity: 1 };

    return (

        <Flex style={{ height: "100vh" }}>
    <Box w="250px">
        <Sidebar />
    </Box>
    <Flex justify="center" style={{ flex: 0.75 }}>
        <Container size="sm" mt={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Title align="center" mb={8}>Book your Ride</Title>

            {showAlert && (
                <Alert title="Booking Successful!" color="green" variant="filled">
                    Your booking details have been sent to your email.
                </Alert>
            )}

            {errorMessage && (
                <Alert title="Booking Error" color="red" variant="filled">
                    {errorMessage}
                </Alert>
            )}

            <Flex gap="md" direction="row" align="flex-start" justify="space-between" style={{ width: "100%" }}>
                {/* Left Column */}
                <div style={{ flex: 1 }}>
                    <Card color="#FAF3F1" shadow="sm" padding="md" radius="md" withBorder>
                        <Flex direction="column" gap="md">
                            <Title order={5} align="center">Passenger details</Title>

                            <Text style={getOpacity(users?.name)}> 👤 Name: {users?.name || "Not Available"}</Text>
                            <Text style={getOpacity(users?.email)}> ✉️ Email: {users?.email || "Not Available"}</Text>
                            <Text style={getOpacity(users?.phone)}>☎️ Phone Number: {users?.phone || "Not Available"}</Text>
                        </Flex>
                        <Divider my={10} />

                        {ride ? (
                            <>
                                <Flex direction="column" gap="md">
                                    <Title order={5} align="center">Driver details</Title>
                                    <Text style={getOpacity(ride?.driverId?.name)}>👤 Name: {ride?.driverId?.name || "Not Available"}</Text>
                                    <Text style={getOpacity(ride?.driverId?.email)}>✉️ Email: {ride?.driverId?.email || "Not Available"}</Text>
                                    <Text style={getOpacity(ride?.driverId?.phone)}>☎️ Phone: {ride?.driverId?.phone || "Not Available"}</Text>
                                    <Text style={isValidDate ? { opacity: 1 } : { opacity: 0.5 }}>
                                        📅 Travel Date: {isValidDate ? travelDate.toLocaleString() : 'Invalid Date'}
                                    </Text>
                                    <Text style={getOpacity(ride?.startTime)}> ⏰ Start Time: {ride?.startTime || "Not Available"} hrs</Text>
                                    <Text style={getOpacity(ride?.origin)}>📍Origin: {ride?.origin || "Not Available"}</Text>
                                    <Text style={getOpacity(ride?.destination)}>🎯Destination: {ride?.destination || "Not Available"}</Text>
                                    <Text style={getOpacity(ride?.waypoints)}>🛣️ Waypoints: {ride?.waypoints || "Not Available"}</Text>
                                </Flex>
                            </>
                        ) : (
                            <Title order={4} align="center">Loading ride details...</Title>
                        )}
                    </Card>
                </div>
            </Flex>

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
        </Container>
        </Flex>
        </Flex>
    );
};

export default CreateBooking;