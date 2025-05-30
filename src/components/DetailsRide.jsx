import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Flex, Button, Container, Card, Text, Title, Divider, Box } from "@mantine/core";
import Sidebar from "./Sidebar";

function RideDetails() {
  const [ride, setRide] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { rideId } = useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const storedToken = localStorage.getItem("authToken");
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/ride/${rideId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRide(response.data))
      .catch((error) => console.log(error));
  }, [rideId]);

  const handleDelete = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/api/ride/${rideId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => {
        setSuccessMessage("Ride successfully deleted!");
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => console.log(error));
  };

  const handleBookRide = (rideId) => {
    navigate("/book", { state: { rideId } });
  };

  const handleUpdateRide = () => {
    // Navigate to the update ride page
    navigate("/updateride"); 
  };

  // Check if the travelDate is valid
  const isValidDate = ride ? !isNaN(new Date(ride.travelDate)) : false;
  const travelDate = isValidDate ? new Date(ride?.travelDate) : null;

  // Utility function to apply opacity
  const getOpacity = (value) => (value === "Not Available" || value === null || value === undefined || value === "") ? { opacity: 0.5 } : { opacity: 1 };

  return (
    <Flex style={{ height: "100vh" }}>
    <Box w="250px">
        <Sidebar />
    </Box>
    <Flex justify="center" style={{ flex: 0.75, transform: 'translateY(-50px)' }}>
    <Container size="md" mt={0} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Title align="center" mb={20}>Ride Details</Title>
      <Text>Where are we traveling today, <strong>{userName}</strong>?</Text>
      <br />

      {ride === null ? (
        <Text align="center" color="red">Ride not found</Text>
      ) : (
        <>
       
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'bottom', gap: '1rem' }}>
            <Title order={1}>{ride.origin} → {ride.destination}</Title>
          </div>
          <br />
          <Flex gap="xl" direction="row" align="flex-start" justify="space-between" style={{ width: "100%" }}>
            {/* Left Column */}
            <div style={{ flex: 1 }}>
              <Card color="#FAF3F1" shadow="sm" padding="lg" radius="md" withBorder>
              <Flex direction="column" gap="md">
                <Title order={4}align="center">Travel information</Title>
                <Text style={isValidDate ? { opacity: 1 } : { opacity: 0.5 }}>
                📅 Travel Date: {isValidDate ? travelDate.toLocaleString() : 'Invalid Date'}
                </Text>
                <Text style={getOpacity(ride.startTime)}>⏰ Start Time: {ride.startTime || "Not Available"} hrs</Text>
                <Text style={getOpacity(ride.endTime)}> ⌛ End Time (approx): {ride.endTime || "Not Available"} hrs</Text>
                <Text style={getOpacity(ride.waypoints)}>🛣️ Waypoints: {ride.waypoints || "Not Available"}</Text>

                <Divider my={20} />
             
                <Title order={4}align="center">Driver Details</Title>
                <Text style={getOpacity(ride.driverId?.name)}>👤 Name: {ride.driverId?.name || "Not Available"}</Text>
                <Text style={getOpacity(ride.driverId?.email)}>✉️ Email: {ride.driverId?.email || "Not Available"}</Text>
                <Text style={getOpacity(ride.driverId?.phone)}>☎️ Phone: {ride.driverId?.phone || "Not Available"}</Text>
                </Flex>
              </Card>
            </div>

            {/* Divider between the two columns */}
            <Divider orientation="vertical" my={10} style={{ height: "100%" }} />

            {/* Right Column */}
            <div style={{ flex: 1, marginTop: '30px' }} >
           
              <Card color="#FAF3F1" shadow="sm" padding="lg" radius="md" withBorder>
              <Flex direction="column" gap="md">
                <Title order={4}align="center">Vehicle Information</Title>
                <Text style={getOpacity(ride.vehicle)}>🚙 Vehicle Type: {ride.vehicle || "Information not Available"}</Text>
                <Text style={getOpacity(ride.licensePlate)}>🔢 License Plate: {ride.licensePlate || "Not Available"}</Text>

                <Divider my={20} />
                <Title order={4} align="center">Preferences</Title>
                <Text style={getOpacity(ride.music !== undefined ? ride.music : "Not Available")}>
                🎶 Music: {ride.music !== undefined ? (ride.music ? "Yes" : "No") : "Not Available"}
                </Text>
                <Text style={getOpacity(ride.smokingAllowed !== undefined ? ride.smokingAllowed : "Not Available")}>
                🚬Smoking Allowed: {ride.smokingAllowed !== undefined ? (ride.smokingAllowed ? "Yes" : "No") : "Not Available"}
                </Text>
                <Text style={getOpacity(ride.petsAllowed !== undefined ? ride.petsAllowed : "Not Available")}>
                🐶Pets Allowed: {ride.petsAllowed !== undefined ? (ride.petsAllowed ? "Yes" : "No") : "Not Available"}
                </Text>
                </Flex>
              </Card>

            </div>
          
          </Flex>
          <br />

          {/* Conditional buttons */}
          {String(userId) === String(ride.driverId?._id) &&(
          <Flex direction="row" gap="md">
              <Button onClick={handleDelete} color="red" radius="xl">Delete this ride</Button>     
               <Button color="green" radius="xl">Edit ride</Button>         
          </Flex>
           )}
           
          {userId !== ride.driverId?._id && (
              <Button variant="filled" color="green" radius="xl" onClick={() => handleBookRide(ride._id)}>
                Book ride
              </Button>
            )}

        </>
      )}
    </Container>
    </Flex>
    </Flex>
  );
}

export default RideDetails;
