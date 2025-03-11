import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import { Button, Group,PasswordInput, TextInput } from "@mantine/core";


function SignUp() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
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

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(SignUpData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Validate password format
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordPattern.test(SignUpData.password)) {
            alert("password needs at least 8 characters and symbols");
            return;
        }
        //Creating account on API
        axios.post(`${API_URL}/auth/signup`, SignUpData)
            .then(respond => { navigate("/login") })
            .catch(e => console.log(" Error creating the new account ...", e));


    }
    console.log("Form Submitted:", SignUpData);


    return (

        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
            <h1>Signup</h1>
            <div className="mb-4">

                <label className="block text-sm font-medium">
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        value={SignUpData.email}
                        onChange={handleChange}
                        required />

                    <TextInput
                        withAsterisk
                        label="Name"
                        placeholder="John Doe"
                        value={SignUpData.name}
                        onChange={handleChange}
                        required />

                    <PasswordInput
                        withAsterisk
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={SignUpData.password}
                        onChange={handleChange}
                        required />

                   
                    <Group justify="center" mt="xl">
                        <Button variant="filled" color="indigo" size="md" radius="md">Submit</Button> </Group>
                </label>
            </div>
        </form>
    );
}

export default SignUp;