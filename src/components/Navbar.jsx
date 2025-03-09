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
                    <Button variant="gradient" gradient={{ from: 'blue', to: 'pink', deg: 300 }}> Home</Button>
                </Link>
                {isLoggedIn && (
                    <>
                        <Link to="/ride">
                            <Button variant="gradient" gradient={{ from: 'blue', to: 'pink', deg: 300 }}> Create Ride</Button>
                        </Link>
                        <Button variant="gradient" gradient={{ from: 'blue', to: 'pink', deg: 300 }} onClick={logOutUser}> Logout</Button>
                        <span>{user && user.name}</span>
                        
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <Link to="/signup">
                            <Button variant="gradient" gradient={{ from: 'red', to: 'grape', deg: 300 }}> Sign Up</Button> </Link>
                        <Link to="/login"> <Button variant="gradient" gradient={{ from: 'red', to: 'grape', deg: 300 }}> Login </Button> </Link>
                    </>
                )}
            </nav>
        </>
    );
}

export default Navbar;