import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Group, Notification, Radio, TextInput, Select, Title, Container, Card, Space, Divider,Flex } from "@mantine/core";

function UpdateBooking() {
    const [seatsBooked, setSeatsBooked] = useState("");
    const [status, setStatus] = useState("pending");
    const [boardingPoint, setBoardingPoint] = useState("");
    const [destination, setDestination] = useState("");
    const [waypoints, setWaypoints] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destinationType, setDestinationType] = useState("destination");
    const [errorMessage, setErrorMessage] = useState("");
    const userName = localStorage.getItem('userName');

    const navigate = useNavigate();
    const { bookingId } = useParams();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
            .then((response) => {
                const booking = response.data;
                setOrigin(booking.ride.origin);
                setDestination(booking.ride.destination);
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
            setErrorMessage("");
            setBoardingPoint(value);
        }
    };

    const handleDestinationChange = (value) => {
        if (value === boardingPoint) {
            setErrorMessage("Boarding point and destination cannot be the same.");
        } else {
            setErrorMessage("");
            setDestination(value);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (boardingPoint === destination) {
            setErrorMessage("Boarding point and destination cannot be the same.");
            return;
        }
        const requestBody = { boardingPoint, destination, status, seatsBooked };
        const storedToken = localStorage.getItem('authToken');

        axios.patch(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then(() => navigate(`/dashboard`))
            .catch((error) => console.log(error));
    };

    const deleteBooking = () => {
        const storedToken = localStorage.getItem('authToken');
        axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
            .then(() => navigate("/dashboard"))
            .catch((error) => console.log(error));
    };

    return (
        <Container>
            <>
                <br />
                <Title order={2} align="center">Update Booking</Title>
                <Divider my="md" />
                <Title order={4} align="center" mb="lg">Were are we travel today, {userName}?</Title>
            </>

            <Flex 
                mih={50}
                gap="lg"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
            >
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Space h="md" />
                <form onSubmit={handleUpdate}>
                    <TextInput label="Seats Booked" value={seatsBooked} onChange={(e) => setSeatsBooked(e.target.value)} required />
                    <Select
                        label="Status"
                        value={status}
                        onChange={setStatus}
                        data={[
                            { value: "pending", label: "Pending" },
                            { value: "confirmed", label: "Confirmed" },
                            { value: "cancelled", label: "Cancelled" }
                        ]}
                    />
                    <Space h="md" />
                    <Title order={5}>Boarding at:</Title>
                    <Group>
                        <Radio label={origin} value="origin" checked={boardingPoint === origin} onChange={() => handleBoardingChange(origin)} />
                        <Radio label="Waypoint" value="waypoint" checked={boardingPoint !== origin} onChange={() => setBoardingPoint("")} />
                    </Group>
                    {boardingPoint !== origin && (
                        <Select
                            placeholder="Select waypoint"
                            value={boardingPoint}
                            onChange={handleBoardingChange}
                            data={waypoints.map((waypoint) => ({ value: waypoint, label: waypoint }))}
                        />
                    )}
                    <Space h="md" />
                    <Title order={5}>Destination:</Title>
                    <Group>
                        <Radio label={destination} value="destination" checked={destinationType === "destination"} onChange={() => setDestinationType("destination")} />
                        <Radio label="Waypoint" value="waypoint" checked={destinationType === "waypoint"} onChange={() => setDestinationType("waypoint")} />
                    </Group>
                    {destinationType === "waypoint" && (
                        <Select
                            placeholder="Select waypoint"
                            value={destination}
                            onChange={handleDestinationChange}
                            data={waypoints.map((waypoint) => ({ value: waypoint, label: waypoint }))}
                        />
                    )}
                    {errorMessage && (
                        <Notification color="red" withCloseButton={false}>{errorMessage}</Notification>
                    )}
                    <Space h="md" />
                    <Group>
                        <Button type="submit" color="green" radius={"xl"} onClick={handleUpdate}>Update Booking 🛠️</Button>
                        <Space h="xl" />
                        <Button color="red" radius={"xl"} onClick={deleteBooking}>Delete Booking 🗑️</Button>
                    </Group>
                </form>
            </Card>
            </Flex>
        </Container>
    );
}

export default UpdateBooking;
