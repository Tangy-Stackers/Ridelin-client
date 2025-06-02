import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { Text, Button, Flex,Container,Title } from "@mantine/core";
import "../assets/App.css";



function Navbar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


    return (
        <>
            <nav>
                <div className="navbar">
                    <Flex
                        h={100}
                        w={2000}
                        align="center"
                        justify="space-between"
                        gap="xs"
                        wrap="wrap"
                        px="lg"
                    >
                        {/* Spacer to push title to center */}
                        <Flex flex={1} />

                        {/* Centered Title Section */}
                        <Flex direction="column" align="center">
                             <Container >
                                            <Title order={1} size={40} c={"#000000"} shadow="sm">
                                                <strong><i>
                                                 Ridelin
                                                 </i> </strong>
                                                  <Title order={4}><Text fw={700} size="xl">The future of commuting</Text></Title>
                                            </Title>
                                        </Container>
                    
                          
                        </Flex>

                        {/* Right-Aligned Buttons */}
                        <Flex gap="md" flex={1} justify="flex-end" mr="160px">
                            {isLoggedIn ? (
                                <>
                                   {/* <Link to="/dashboard">
                                        <Button variant="filled" color="red" radius="xl"> 📋 Dashboard</Button>
                                    </Link>*/}
                                   <span fz="xl"><b><i>Hi {user && user.name}!</i></b></span>
                                    <Button onClick={logOutUser} variant="filled" color="red" radius="xl"> ⏻ Logout</Button>
                                   
                                </>
                            ) : (
                                <>
                                    <Link to="/signup">
                                        <Button variant="filled" color="green" radius="xl"><Text size="lg">🤝Join us!</Text></Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button variant="filled" color="green" radius="xl"><Text size="lg">👤Login</Text></Button>
                                    </Link>
                                </>
                            )}
                        </Flex>
                    </Flex>
                </div>
            </nav>
        </>
    );
}

export default Navbar;