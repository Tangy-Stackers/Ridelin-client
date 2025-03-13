import { Card, Text, Container, Title, Center, Stack, Group } from "@mantine/core";
import SearchRide from "../components/SearchRide";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/App.css";

function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (user) {
    navigate("/dashboard")
  }
    

    return (
      <Container size="xl" py={40} >
        <Center>
          <Title order={1}>
            Welcome to Ridelin
          </Title>
        </Center>
        <Center>
          <Title order={2} align="center" weight={500}>
            The Future of Commuting: Share a Ride, Save Money, Meet New People, and Make a Difference
          </Title>
        </Center>

        <Center mt={20}>
          <SearchRide />
        </Center>

        <Stack spacing="xl" mt={40} align="center">
          <Title order={2}>Tired of commuting alone?</Title>
          <Text weight={700} align="center" size="lg">
            Meet Ridelin, the carpooling app that makes sharing rides easy, affordable, and eco-friendly.
          </Text>
          <Text weight={700} align="center" size="lg">
            Whether you're commuting to work, running errands, or embarking on a road trip, join trusted riders and drivers to share costs, cut emissions, and make every ride more enjoyable!
          </Text>
        </Stack>

        <Title order={2} mt={50} align="center">
          Why us?
        </Title>
        <Group spacing="lg" mt={27} mb={27} align="center" position="center" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
         
            <Text weight={700} size="lg">💰 Save Money</Text>
         
          <Text>Share rides and cut down on fuel expenses.</Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
        
            <Text weight={700} size="lg">🌱 Drive Less, Breathe More</Text>
         
          <Text>Reduce traffic and CO₂, shrinking your carbon footprint.</Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          
            <Text weight={700} size="lg">🤝 Meet New People</Text>
          
          <Text>Connect with fellow travelers and build community.</Text>
        </Card>
      </Group>
      </Container>
    );
  }
export default HomePage;
