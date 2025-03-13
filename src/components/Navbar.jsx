import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import "../App.css";



function Navbar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


    return (
        <>
            <nav>
                <h1><strong><i>Ridelin</i></strong></h1>
                <h3> Your carpooling partner</h3>

                {isLoggedIn && (
                    <>
                        <Link to="/dashboard">
                            <Button variant="filled" color="red" radius="xl"> Dashboard</Button>
                        </Link>
                        <Link to="/createride">
                            <Button variant="filled" color="red" radius="xl"> Create Ride</Button>
                        </Link>
                        <Button onClick={logOutUser} variant="filled" color="red" radius="xl"> Logout</Button>
                        <span><b><i>Hi {user && user.name}!</i></b></span>

                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <Link to="/signup">
                            <Button variant="filled" color="green" radius="xl"> 🤝Join us! </Button> </Link>
                        <Link to="/login"> <Button variant="filled" color="green" radius="xl">👤Login </Button> </Link>
                    </>
                )}
            </nav>
        </>
    );
}

export default Navbar;