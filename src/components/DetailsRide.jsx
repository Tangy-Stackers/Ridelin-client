import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import axios from "axios";
import { Button, Container, Card, Text, Title, Group, Divider } from "@mantine/core";



function RideDetails() {
  const [ride, setRide] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { rideId } = useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/ride/${rideId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRide(response.data))
      .catch((error) => console.log(error));
  }, [rideId]);

  const handleDelete = () => {
    axios.delete(`${API_URL}/api/ride/${rideId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => {
        setSuccessMessage("Ride successfully deleted!");
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => console.log(error));
  };

  const handleBookRide = (rideId) => {
    navigate("/book", { state: { rideId } });
  };

  // Check if the travelDate is valid
  const isValidDate = ride ? !isNaN(new Date(ride.travelDate)) : false;
  const travelDate = isValidDate ? new Date(ride?.travelDate) : null;

  // Utility function to apply opacity
  const getOpacity = (value) => (value === "Not Available" || value === null || value === undefined || value === "") ? { opacity: 0.5 } : { opacity: 1 };

  return (
    <Container size="md" mt={20}>
      <Title align="center" mb={20}>Ride Details</Title>
      {ride === null ? (
        <Text align="center" color="red">Ride not found</Text>
      ) : (
        <Card color="#FAF3F1" shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3}>{ride.origin} → {ride.destination}</Title>

          <Text style={isValidDate ? { opacity: 1 } : { opacity: 0.5 }}>
            Travel Date:
            {isValidDate ? travelDate.toLocaleString() : 'Invalid Date'}
          </Text>

          <Text style={getOpacity(ride.startTime)}>Start Time: {ride.startTime || "Not Available"}</Text>
          <Text style={getOpacity(ride.endTime)}>End Time (approx): {ride.endTime || "Not Available"}</Text>
          <Text style={getOpacity(ride.waypoints)}>Waypoints: {ride.waypoints || "Not Available"}</Text>

          <Divider my={10} />
          <Title order={4}>Driver Details</Title>
          <Text style={getOpacity(ride.driverId?.name)}>Name: {ride.driverId?.name || "Not Available"}</Text>
          <Text style={getOpacity(ride.driverId?.email)}>Email: {ride.driverId?.email || "Not Available"} </Text>
          <Text style={getOpacity(ride.driverId?.phone)}>Phone: {ride.driverId?.phone || "Not Available"}</Text>

          <Divider my={10} />
          <Title order={4}>Vehicle Information</Title>

          <Text style={getOpacity(ride.vehicle)}>Vehicle Type: {ride.vehicle || "Information not Available"}</Text>

          <Text style={getOpacity(ride.licensePlate)}>License Plate: {ride.licensePlate || "Not Available"}</Text>

          <Divider my={10} />
          <Title order={4}>Preferences</Title>
          <Text style={getOpacity(ride.music !== undefined ? ride.music : "Not Available")}>
            Music: {ride.music !== undefined ? (ride.music ? "Yes" : "No") : "Not Available"}
          </Text>
          <Text style={getOpacity(ride.smokingAllowed !== undefined ? ride.smokingAllowed : "Not Available")}>
            Smoking Allowed: {ride.smokingAllowed !== undefined ? (ride.smokingAllowed ? "Yes" : "No") : "Not Available"}
          </Text>
          <Text style={getOpacity(ride.petsAllowed !== undefined ? ride.petsAllowed : "Not Available")}>
            Pets Allowed: {ride.petsAllowed !== undefined ? (ride.petsAllowed ? "Yes" : "No") : "Not Available"}
          </Text>

          <Group mt={20} position="apart">
            {userId === ride.driverId && (
              <Button color="red" onClick={handleDelete}>Delete Ride</Button>
            )}
            <Button color={'#34AE00'} radius="xl" onClick={() => handleBookRide(ride._id)}>
              Book Ride
            </Button>
          </Group>

          {successMessage && <Text color="green" mt={10}>{successMessage}</Text>}
        </Card>
      )}
    </Container>
  );
}

export default RideDetails;
