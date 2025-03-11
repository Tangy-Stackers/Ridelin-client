import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useForm } from "@mantine/form";
import { Button, PasswordInput, TextInput } from "@mantine/core";



function Loginpage() {


    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
            password: (value) => (value.length >= 6 ? null : "Password must be at least 6 characters"),
        },
    });
      const handleLoginSubmit = (e) => {
           e.preventDefault();
           const { email, password } = form.values;
           const requestBody = { email, password };
           console.log(email);
           console.log(password);
           axios.post(`${API_URL}/auth/login`, requestBody)
               .then((response) => {
                   console.log('JWT token', response.data.authToken);
                   storeToken(response.data.authToken);
                   authenticateUser();
                   navigate('/dashboard');
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
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                        required
                    />
                    <PasswordInput
                        withAsterisk
                        label="Password"
                        placeholder="••••••••"
                        {...form.getInputProps("password")}
                        required
                        mt="md"
                    />
                     <Button type="submit" color="indigo" radius="md" mt="lg">Login</Button>
            </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p>Don't have an account yet?</p>
                
                <Link to={"/signup"}><Button type="submit" color="orange" radius="md" mt="lg"> Sign Up </Button>
              </Link>
            </div>
        </>
    )
}

export default Loginpage;