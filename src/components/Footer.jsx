
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/api";
import { Button } from "@mantine/core";

function Footer(){
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken");

    const goToProfile = () => {
        navigate(`/user/${userId}`);
    };
    const goToRides = () => {
        navigate(`/`);
    };


    return (
        <div className="p-4 bg-gray-200 text-center">
            
             <Button onClick={goToProfile} color="indigo" radius="md" mt="lg">  Go to Profile </Button>
             <Button onClick={goToRides} color="indigo" radius="md" mt="lg">  Available rides </Button>
        
        </div>
    );
}

export default Footer;