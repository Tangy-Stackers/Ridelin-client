import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import { Button, TextInput } from "@mantine/core";

function CreateBooking() {
    const [passengerId, setPassengerId] = useState("");
    const [ride, setRide] = useState("");
    const [status, setStatus] = useState("pending");
    const [bookingDate, setBookingDate] = useState("");
    const [seatsBooked, setSeatsBooked] = useState("");
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { passengerId, ride, status, bookingDate, seatsBooked };
        axios.post(`${API_URL}/api/book`, requestBody)
            .then((response) => {
                console.log("Sucess");
                navigate("/");
            }).catch((error) => {
                console.log("error", error);
            });
    }


    return (
        <div className="createBooking">
            <h1>Create Booking</h1>
            <form onSubmit={handleSubmit}>
            <TextInput
                    withAsterisk
                    label="Passenger ID"
                    placeholder="Enter Passenger ID"
                    value={passengerId}
                    onChange={(e) => setPassengerId(e.target.value)}
                    required
                />
                
                <TextInput
                    label="Ride"
                    placeholder="Enter Ride ID"
                    value={ride}
                    onChange={(e) => setRide(e.target.value)}
                />

                <TextInput
                    label="Booking Date"
                    placeholder="YYYY-MM-DD"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                />

                <TextInput
                    label="Seats Booked"
                    placeholder="Number of Seats"
                    value={seatsBooked}
                    onChange={(e) => setSeatsBooked(e.target.value)}
                />

                
                <Button  variant="filled" color="red" radius="xl"> Create Booking ✏️</Button>
            </form>
      
        </div>
    )
}

export default CreateBooking;