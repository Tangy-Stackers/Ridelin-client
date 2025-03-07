
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import { useParams } from "react-router-dom";



const DetailsRide = () => {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [storedToken, setStoredToken] = useState(localStorage.getItem("authToken"));
    const [rideDetails, setRideDetails] = useState(null);
    const params = useParams()
    const rideId =params.rideId


    useEffect(() => {
        if (!userId || !storedToken) {
            console.log("No userId or token found");
            return;
        }
        axios.get(`${API_URL}/api/ride/${rideId}`,
            { headers: { Authorization: `Bearer ${storedToken}`} }
        )

        .then((response) => {
            console.log(response.data);
            setRideDetails(response.data);
        })
        .catch(e => {
            console.log('Error getting the user data', e);
        });
    }, [rideId, storedToken]); // Ensure `userId` is included

    return (
        <div>
            {rideDetails ? (
                <div>
                    <p>{rideDetails.origin}</p>
                    <p>Email: {rideDetails.destination}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DetailsRide;
