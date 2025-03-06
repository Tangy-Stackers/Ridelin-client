import React, { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(false);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }
    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
            axios.get(`${API_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then((response) => {
                    const user = response.data;
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user);
                })
                .catch((error) => {
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                });
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }

    const removeToken = () => {
        localStorage.removeItem("authToken");
    }

    const logOutUser = () => {
        removeToken();
        authenticateUser();
    }
    useEffect(() => {
        authenticateUser();
    }, []);
    return (
        <>
            <AuthContext.Provider value={{ isLoggedIn, isLoading, user }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

export { AuthProviderWrapper, AuthContext };