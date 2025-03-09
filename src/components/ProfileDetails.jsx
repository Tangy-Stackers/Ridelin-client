
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/api";



const UserProfile = () => {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [storedToken, setStoredToken] = useState(localStorage.getItem("authToken"));
    const [profileDetails, setProfileDetails] = useState(null);

    useEffect(() => {
        if (!userId || !storedToken) {
            console.log("No userId or token found, skipping API call");
            return;
        }

        axios.get(`${API_URL}/api/user/${userId}`, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then((response) => {
            console.log(response.data);
            setProfileDetails(response.data);
        })
        .catch(e => {
            console.log('Error getting the user data', e);
        });
    }, [userId, storedToken]); // Ensure `userId` is included

    return (
        <div>
            {profileDetails ? (
                <div>
                    <h1>{profileDetails.name}</h1>
                    <p>Email: {profileDetails.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
