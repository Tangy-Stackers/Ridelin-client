
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/api";

function Footer(){
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
        <div className="p-4 bg-gray-200 text-center">
            <button 
                onClick={goToProfile} 
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Go to Profile
            </button>
            <button 
                onClick={goToRides} 
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Available rides
            </button>
        </div>
    );
}

export default Footer;