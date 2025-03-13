import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useForm } from "@mantine/form";
import {
  Button,
  PasswordInput,
  TextInput,
  Container,
  Paper,
  Title,
  Text,
  Notification,
} from "@mantine/core";

function Loginpage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(undefined);

  useEffect(() => {
    setIsSuccess(searchParams.get("success"));
  }, [searchParams]);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form.values;
    const requestBody = { email, password };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/dashboard");
      })
      .catch(() => {
        setErrorMessage("Something went wrong. Please try again.");
      });
  };

  return (
    <Container size={420} my={40}>
      {isSuccess == 1 && (
        <Notification color="green" title="Success!">
          Account Successfully Created! You can Log In now.
        </Notification>
      )}
      <Container >
        <Title order={1} size={25} c={"#000000"} shadow="sm">
          <strong>
            Welcome Back to Ridelin
          </strong>
        </Title>
      </Container>
      <br />
      <Paper shadow="xs" p={30} radius="md" withBorder>
        <Title align="center" order={2}>
          Login
        </Title>
        <form onSubmit={handleLoginSubmit}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
            required
            mt="md"
          />
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="••••••••"
            {...form.getInputProps("password")}
            required
            mt="md"
          />
          <Button type="submit" fullWidth mt="lg" color={"#6D509B"} radius="xl">
            Login
          </Button>
        </form>
        {errorMessage && (
          <Text color="red" size="sm" mt="sm" align="center">
            {errorMessage}
          </Text>
        )}
        <Text align="center" mt="md">
          Don't have an account yet?
        </Text>
        <Link to="/signup">
          <Button fullWidth mt="sm" color={"#FF5733"} radius="xl">
            Sign Up
          </Button>
        </Link>
      </Paper>
    </Container>
  );
}

export default Loginpage;