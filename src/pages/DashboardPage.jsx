import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Text, Container, Title } from "@mantine/core";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "@mantine/core/styles.css";
import SearchRide from "../components/SearchRide";
import ListOfBooking from "../components/ListOfBooking";
import { AuthContext } from "../context/auth.context";

// Show booking rides
function DashBoardPage() {
    const userName = localStorage.getItem('userName');
    const location = useLocation();
    const navigate = useNavigate();
    const [rides, setRides] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${import.meta.env.VITE_API_URL}/api/ride`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setRides(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleGoToDetails = (rideId) => {
        navigate(`/ride/${rideId}`);
    }

    if (!user) {
        navigate("/");
    }

    return (
        <Container size="md" py="xl">
            <>
            <Title order={2} align="center" mb="lg">Welcome to Ridelin </Title>
            <Title order={4} align="center" mb="lg">Were are we travel today, {userName}?</Title>
            </>
            
            <SearchRide />
            <ListOfBooking />
            
            <div>
                {rides.length === 0 ? (
                    <>
                    <Text align="center" color="dimmed"> We don't have rides to show for you.</Text>
                    <Text align="center" color="dimmed"><strong>Would you like to Search for a ride?</strong> </Text>
                    </>   
                ) : (
                    rides.map((ride) => (
                        <Card key={ride._id} shadow="sm" padding="lg" radius="md" withBorder mb="md">
                            <Text weight={500}>Ride ID: {ride._id}</Text>
                            <Text>Origin: {ride.origin} — Destination: {ride.destination}</Text>
                            <Text>Travel Date: {ride.travelDate && !isNaN(new Date(ride.travelDate))
                                ? new Date(ride.travelDate).toISOString().split('T')[0] : 'Invalid Date'}
                            </Text>
                            <Text>Driver: {ride.driverId.name}</Text>
                            <Button color="indigo" radius="md" mt="lg" onClick={() => { handleGoToDetails(ride._id) }}>
                                More Details
                            </Button>
                        </Card>
                    ))
                )}
            </div>
        </Container>
    );
}

export default DashBoardPage;
