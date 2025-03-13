import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Text, Container, Title } from "@mantine/core";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "@mantine/core/styles.css";
import SearchRide from "../components/SearchRide";
import ListOfBooking from "../components/ListOfBooking";
import { AuthContext } from "../context/auth.context";
import useEmblaCarousel from 'embla-carousel-react';
import Sidebar from "../components/sidebar";

// Show booking rides
function DashBoardPage() {
  const userName = localStorage.getItem('userName');
  const location = useLocation();
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const { user } = useContext(AuthContext);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

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
  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  const scrollPrev = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  };

  const scrollNext = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  };


  return (
<>
<Sidebar />

    <Container size="md" py="xl">
  

      <SearchRide />
      <ListOfBooking />

      {rides.length === 0 ? (
        <>
          <Text align="center" color="dimmed"> We don't have rides to show for you.</Text>
          <Text align="center" color="dimmed"><strong>Would you like to Search for a ride?</strong> </Text>
        </>
      ) : (
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {rides.map((ride) => (
                <div className="embla__slide" key={ride._id}>
                  <Card key={ride._id} shadow="sm" padding="lg" radius="md" withBorder mb="md">
                    <Text>Origin: {ride.origin} — Destination: {ride.destination}</Text>
                    <Text>Travel Date: {ride.travelDate && !isNaN(new Date(ride.travelDate))
                      ? new Date(ride.travelDate).toISOString().split('T')[0] : 'Invalid Date'}
                    </Text>
                    <Text>Driver: {ride.driverId.name}</Text>
                    <Button color="indigo" radius="md" mt="lg" onClick={() => { handleGoToDetails(ride._id) }}>
                      More Details
                    </Button>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="embla__buttons">
            <Button onClick={scrollPrev} color="gray" radius="xl">
              Prev
            </Button>
            <Button onClick={scrollNext} color="gray" radius="xl">
              Next
            </Button>
          </div>
        </div>
      )}
    </Container >
    </>
  );
}

export default DashBoardPage;
