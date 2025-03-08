import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import { AuthContext } from "../context/auth.context";
import axios from "axios";



function Loginpage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };
        console.log(email);
        console.log(password);
        axios.post(`${API_URL}/auth/login`, requestBody)
            .then((response) => {
                console.log('JWT token', response.data.authToken);
                storeToken(response.data.authToken);
                console.log("helloooo");
                authenticateUser();
                navigate('/');
            })
            .catch((error) => {
                let errorDescription = "Something went wrong. Please try again.";
                console.log(error);
                setErrorMessage(errorDescription);
            })
    };
    return (
        <>
            <div className="LoginPage">
                <h1>Login</h1>

                <form onSubmit={handleLoginSubmit}>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={handleEmail} />
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePassword} />
                    <button type="submit">Login</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p>Don't have an account yet?</p>
                
                <Link to={"/signup"}> Sign Up</Link>
            </div>
        </>
    )
}

export default Loginpage;