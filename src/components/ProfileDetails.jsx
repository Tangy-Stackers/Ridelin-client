import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";



const UserProfile = () => {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [storedToken, setStoredToken] = useState(localStorage.getItem("authToken"));
    const [profileDetails, setProfileDetails] = useState(null);
    const navigate = useNavigate();

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

    const handleUpdate = () => {
        navigate(`/user/${userId}/edit`);
    }

    return (
        <div>
            {profileDetails ? (
                <div className="UserDetails">
                 <img className="img" src={profileDetails.image} alt="User Profile" />
                    <h1>{profileDetails.name}</h1>
                    <p>✉️<b>Email:</b> {profileDetails.email}</p>
                    <p>📞<b>Phone Number:</b>{profileDetails.phone}</p>
                    <p>💭 <b>About me:</b> {profileDetails.about}</p>
                    <Button color="indigo" radius="md" mt="lg" onClick={handleUpdate}>Edit profile</Button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            

        </div>
    );
};

export default UserProfile;
