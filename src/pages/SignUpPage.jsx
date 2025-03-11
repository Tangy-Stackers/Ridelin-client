import axios from "axios";
import { useState } from "react";
import { useNavigate,useLocation,useSearchParams } from "react-router-dom";
import { API_URL } from "../config/api";
import { Button, Group,PasswordInput, TextInput } from "@mantine/core";


function SignUp() {
    const navigate = useNavigate();
    const location = useLocation();
    

    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);


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
            .then(response => {
                setAlertMessage("Account created successfully! Login to continue");
                setShowAlert(true);
        
                setTimeout(() => {
                    setShowAlert(false);
                    navigate(`/login?success=1`);
                   
                }, 4000);
            })
            .catch((e )=> {
                console.log(" Error creating the new account ...", e)
                alert(e.response.data.message);

            });


    }
    // console.log("Form Submitted:", SignUpData);


    return (
        <div>
             {location.state?.message && <p>{location.state.message}</p>}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
                <h1>Signup</h1>
                <div className="mb-4">

                    <label className="block text-sm font-medium">
                        <TextInput
                            name="email"
                            withAsterisk
                            label="Email"
                            placeholder="your@email.com"
                            value={SignUpData.email}
                            onChange={handleChange}
                            required />

                        <TextInput
                            name="name"
                            withAsterisk
                            label="Name"
                            placeholder="John Doe"
                            value={SignUpData.name}
                            onChange={handleChange}
                            required />

                        <PasswordInput
                            name="password"
                            withAsterisk
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            value={SignUpData.password}
                            onChange={handleChange}
                            required />

                    
                        <Group justify="center" mt="xl">
                            <Button onClick={handleSubmit} variant="filled" color="indigo" size="md" radius="md">Submit</Button> </Group>
                    </label>
                </div>
            </form>

        </div>
       
    );
}

export default SignUp;