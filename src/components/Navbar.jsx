import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";



function Navbar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


    return (
        <>
            <nav>
                <Link to="/">
                    <Button variant="filled" color="red" radius="xl"> Home</Button>
                </Link>
                {isLoggedIn && (
                    <>
                        <Link to="/createride">
                            <Button variant="filled" color="red" radius="xl"> Create Ride</Button>
                        </Link>
                        <Button variant="filled" color="red" radius="xl"> Logout</Button>
                        <span><b><i>Hi {user && user.name}!</i></b></span>
                        
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <Link to="/signup">
                            <Button variant="filled" color="red" radius="xl"> Sign Up</Button> </Link>
                        <Link to="/login"> <Button variant="filled" color="red" radius="xl"> Login </Button> </Link>
                    </>
                )}
            </nav>
        </>
    );
}

export default Navbar;