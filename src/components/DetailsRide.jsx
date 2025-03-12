import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import axios from "axios";
import { Button, Container, Card, Text, Title, Group, Flex } from "@mantine/core";

function RideDetails() {
  const [ride, setRide] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { rideId } = useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
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
    axios
      .delete(`${API_URL}/api/ride/${rideId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setSuccessMessage("Ride successfully deleted!");
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => console.log(error));
  };

  const handleBookRide = (rideId) => {
    navigate("/book", { state: { rideId } });
  };

  return (

    <Container size="sm" py="xl">
        <Title align="center">Ride Details</Title>
        {successMessage && <Text align="center">{successMessage}</Text>}
        {ride === null ? (
          <Text align="center">Ride not found</Text>
        ) : (
          <Card  color="#FAF3F1" shadow="sm" padding="lg" radius="md" withBorder>
            <Flex justify="center" align="center" gap="md" direction="row" wrap="wrap">
              <Flex direction="column" align="center">
                <Text>From:</Text>
                <Title order={3}>{ride.origin}</Title>
              </Flex>
              <Text>→</Text>
              <Flex direction="column" align="center">
                <Text>To:</Text>
                <Title order={3}>{ride.destination}</Title>
              </Flex>
            </Flex>
            <br />
            <Text>Your Driver is:
              <Text fw={700}>{ride.driverId?.name || "Information not Available"}</Text>
            </Text>
            <Text>Email:
              <Text fw={700}>{ride.driverId?.email || "Information not Available"}</Text>
            </Text>
            <Text>Phone:
              <Text fw={700} >{ride.driverId?.phone || "Information not Available"}</Text>
            </Text>
            <Text>Travel Date:
              <Text fw={700}> {ride.traveldate || "Information not Available"}</Text>
            </Text>
            <Text>Start Time:
              <Text fw={700} >{ride.startTime || "Information not Available"}</Text>
            </Text>
            <Text>End Time (estimated):
              <Text fw={700} >{ride.endTime || "Information not Available"}</Text>
            </Text>
            <Text>Distance:
              <Text fw={700} >{ride.distance || "Information not Available"}</Text>
            </Text>
            <Group position="right" mt="md">
              {userId === ride.driverId && (
                <Button variant="outline" color="red" onClick={handleDelete}>
                  Delete this ride
                </Button>
              )}
              <Button variant="filled" color="green" radius="xl" onClick={() => handleBookRide(ride._id)}>
                Book Ride
              </Button>

            </Group>
          </Card>
        )}
    </Container>

  );
}

export default RideDetails;
