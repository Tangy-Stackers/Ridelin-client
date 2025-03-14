
import { Link, useNavigate } from "react-router-dom";
import { Flex, Button, Box } from "@mantine/core";
import SearchRide from "./SearchRide";
import "../assets/Booking.css";

function Sidebar() {
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken");

    const goToProfile = () => {
        navigate(`/user/${userId}`);
    };
    const goToRides = () => {
        navigate(`/dashboard`);
    };


    return (
        <>
        <div className="sidebar">
            <Box w ="300px">
            <Flex
                mih={50}
                gap="xs"
                justify="flex-start"
                align="flex-start"
                direction="column"
                wrap="wrap"
                m="xl"
                p="lg"
            >
                <Link to="/dashboard">
                    <Button variant="light" color="red" radius="xl"> 📋 Dashboard</Button>
                </Link>
                <Link to="/createride">
                    <Button variant="light" color="red" radius="xl"> ➕ Create Ride</Button>
                </Link>
                <Button onClick={goToProfile} variant="light" color="red" radius="xl" > 🧑‍💻 Go to Profile </Button>

            </Flex>
            </Box>
            
        </div>
      
         </>
    );
}

export default Sidebar;