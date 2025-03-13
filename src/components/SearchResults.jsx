import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card, TextInput, Select, Container, Title, Stack, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/Booking.css";
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
        if (!origin && !destination && !date) {
            setOrigin(searchParams.get("origin"));
            origin = searchParams.get("origin");
            setDestination(searchParams.get("destination"));
            destination = searchParams.get("destination");
            setSelectedDate(searchParams.get("date"));
            date = searchParams.get("date");
        }

        const storedToken = localStorage.getItem("authToken");
        axios.get(`${import.meta.env.VITE_API_URL}/api/ride`, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
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
                ride.origin && ride.destination &&
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
    };
    
    return (
        <Container>
            <Title order={2} align="center" my="md">Search Results</Title>
            <SearchRide 
                originValue={origin} 
                destinationValue={destination} 
                dateValue={selectedDate} 
                navigateCallback={doSearch} 
            />
            
            <Container 
                gap="lg" 
                my="md" 
                style={{ maxWidth: "300px" }}>
                <label>Sort by Date:</label>
                <Select
                    value={sortOrder}
                    onChange={setSortOrder}
                    data={[
                        { value: "asc", label: "Earliest First" },
                        { value: "desc", label: "Latest First" }
                    ]}
                    style={{ flex: "0 1 150px" }}
                />
            </Container>
            
            <Flex
                gap="md" 
                direction="row" 
                align="center" 
                justify="center" 
                wrap="wrap"
                style={{ width: "100%" }}
            >
                <Stack spacing="lg">
                    {filteredRides.length === 0 ? (
                        <p>No rides found for your search.</p>
                    ) : (
                        filteredRides.map((ride) => (
                            <Card key={ride._id} shadow="sm" padding="lg" radius="md" withBorder>
                                <Title order={4}>Ride ID: {ride._id}</Title>
                                <p>Origin: {ride.origin}</p>
                                <p>Destination: {ride.destination}</p>
                                <p>Travel Date: {new Date(ride.travelDate).toLocaleString()}</p>
                                <p>Driver: {ride.driverId}</p>
                                <Button color="indigo" radius="md" mt="md" onClick={() => handleGoToDetails(ride._id)}>
                                    More Details
                                </Button>
                            </Card>
                        ))
                    )}
                </Stack>
            </Flex>
        </Container>
    );
}

export default SearchResults;
