import { Card, Text } from "@mantine/core";
import Dashboard from "../components/Dashboard";
import SearchRide from "../components/SearchRide";
import "../App.css";


  

function HomePage() {
  return (
    <>
   
      <h1><i>Welcome to Ridelin </i> </h1>
      <h2>The Future of Commuting: Share a Ride, Save Money, Meet New People, and Make a Difference</h2>
     
      <SearchRide />

      <h2>Tired of commuting alone?</h2>
      <h3><b>Meet Ridelin, the carpooling app that makes sharing rides easy, affordable, and eco-friendly.</b> </h3>
      <h3><b>Whether you're commuting to work, running errands or embarking on a road trip, join trusted riders and drivers to share costs, cut emissions and make every ride more enjoyable!







</b></h3>

   


      <h2>Why us?</h2>
      <section className="cards-container">
          <Card padding="xl">
          <div className="card">
            <Card.Section><b> 💰 Save Money </b> </Card.Section>
            <Text> Share rides and cut down on fuel expenses.</Text>
            </div>
            </Card>
            <Card padding="xl">
            <div className="card">
            <Card.Section><b>🌱 Drive Less, Breathe More </b> </Card.Section>
            <Text>Reduce traffic and CO₂, shrinking your carbon footprint.</Text>
            </div>
            </Card>
            <Card padding="xl">
            <div className="card">
            <Card.Section><b>🤝 Meet New People </b></Card.Section>
            <Text>Connect with fellow travelers and build community.</Text>
            </div>
          </Card>
    
      </section >





    </>
  )
}

  export default HomePage;