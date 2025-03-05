import { useState } from "react";
import { API_URL } from "../config/api";

const AuthContext = React.createContext();
function AuthProviderWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(false);




    return (
        <>
            <AuthContext.Provider value={{ isLoggedIn, isLoading, user }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

export { AuthProviderWrapper, AuthContext};