import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Paper, Title, TextInput, Button, Text, Stack} from "@mantine/core";





function UpdateRide() {

    const [ride, setRide] = useState({
        origin: "",
        destination: "",
        startTime: "",
        endTime: "",
        waypoints: "",
    });
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { rideId } = useParams();
    const navigate = useNavigate();
    
    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/ride/${rideId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((res) => setRide(res.data))
            .catch((err) => setError("Failed to load ride details."));
    }, [rideId]);

    const handleChange = (e) => {
        setRide({ ...ride, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`${import.meta.env.VITE_API_URL}/api/ride/${rideId}`, ride, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                setSuccess(true);
                setTimeout(() => navigate(`/ride/${rideId}`), 1500);
            })
            .catch(() => setError("Failed to update ride."));
    };

    return (
        <Container size="sm" mt={80}>
            <Paper withBorder shadow="md" p="xl" radius="md">
                <Title order={2} align="center" mb="md">
                    Update Ride
                </Title>

                {error && <Text color="red" align="center">{error}</Text>}
                {success && <Text color="green" align="center">Ride updated successfully!</Text>}

                <form onSubmit={handleSubmit}>
                    <Stack spacing="md">
                        <TextInput
                            label="Origin"
                            name="origin"
                            value={ride.origin}
                            onChange={handleChange}
                            
                        />
                        <TextInput
                            label="Destination"
                            name="destination"
                            value={ride.destination}
                            onChange={handleChange}
                            
                        />
                         <TextInput
                            label="Waypoint"
                            name="Waypoint"
                            value={ride.waypoints}
                            onChange={handleChange}
                            
                        />
                        <TextInput
                            label="Start-Time"
                            name="time"
                            type="datetime-local"
                            value={ride.startTime}
                            onChange={handleChange}
                            
                        />

                        <Button type="submit" color="blue" fullWidth mt="md">
                            Update Ride
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}

export default UpdateRide;