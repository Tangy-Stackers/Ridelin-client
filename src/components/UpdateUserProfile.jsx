import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

const UpdateUserProfile = () => {
    const [user, setUser] = useState({
        name: "",
        phone: "",
        image: "",
        about: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {

        if (userId) {
            axios
                .get(`${API_URL}/api/user/${userId}`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [userId, storedToken]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");


        const updatedData = { ...user };

        axios
            .patch(`${API_URL}/api/user/${userId}`, updatedData, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                setIsLoading(false);
                setSuccessMessage("Profile updated successfully!");
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            })
            .catch((error) => {
                setIsLoading(false);
                setErrorMessage("Server error");
            });
    };

    return (
        <div className="profile-update-form">
            <h2>Update Your Profile</h2>

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Profile Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={user.image}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>About Me</label>
                    <textarea
                        name="about"
                        value={user.about}
                        onChange={handleChange}
                        maxLength="500"
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default UpdateUserProfile;