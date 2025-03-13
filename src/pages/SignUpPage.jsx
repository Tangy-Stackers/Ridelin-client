import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Group, PasswordInput, TextInput, Paper, Container, Title, Stack, Notification } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconEye, IconEyeOff } from "@tabler/icons-react";

function SignUp() {
    const navigate = useNavigate();
    const location = useLocation();
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showPassword, { toggle }] = useDisclosure(false);

    const [SignUpData, setSignUpData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setSignUpData({
            ...SignUpData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(SignUpData.email)) {
            setAlertMessage("Please enter a valid email address.");
            setShowAlert(true);
            return;
        }

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(SignUpData.password)) {
            setAlertMessage("Password needs at least 8 characters, including a number and a symbol.");
            setShowAlert(true);
            return;
        }

        axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, SignUpData)
            .then(() => {
                setAlertMessage("Account created successfully! Redirecting...");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    navigate(`/login?success=1`);
                }, 1000);
            })
            .catch((e) => {
                setAlertMessage(e.response?.data?.message || "Error creating account.");
                setShowAlert(true);
            });
    };

    return (
        <Container size={420} my={40}>
            {showAlert && (
                <Notification
                    icon={<IconCheck size={18} />}
                    color="green"
                    title="Notification"
                    onClose={() => setShowAlert(false)}
                >
                    {alertMessage}
                </Notification>
            )}
            <Container >
                <Title order={1} size={25} c={"#000000"} shadow="sm">
                    <strong>
                        Become part of Ridelin
                    </strong>
                </Title>
            </Container>
            <br />

            <Paper shadow="md" p="xl" radius="md" withBorder>
                <Title order={2} align="center" mb="md">Signup</Title>

                {location.state?.message && (
                    <Notification color="blue" mb="md">{location.state.message}</Notification>
                )}

                <form onSubmit={handleSubmit}>
                    <Stack>
                        <TextInput
                            name="email"
                            withAsterisk
                            label="Email"
                            placeholder="your@email.com"
                            value={SignUpData.email}
                            onChange={handleChange}
                            required
                        />

                        <TextInput
                            name="name"
                            withAsterisk
                            label="Name"
                            placeholder="John Doe"
                            value={SignUpData.name}
                            onChange={handleChange}
                            required
                        />

                        <PasswordInput
                            name="password"
                            withAsterisk
                            label="Password"
                            placeholder="********"
                            value={SignUpData.password}
                            onChange={handleChange}
                            visibilityToggleIcon={({ reveal }) =>
                                reveal ? <IconEyeOff size={18} /> : <IconEye size={18} />
                            }
                            visible={showPassword}
                            onVisibilityChange={toggle}
                            required
                        />

                        <Group justify="center" mt="md">
                            <Button type="submit" variant="filled" color={"#FF5733"} size="md" radius="md">
                                Submit
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}

export default SignUp;