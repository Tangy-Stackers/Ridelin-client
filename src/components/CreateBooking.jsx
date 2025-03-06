import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

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
        axios.post(`${API_URL}/book`, requestBody)
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
                <label>PassengerId:
                    <input type="text" name="PassengerIe" placeholder="Enter the passengerId" onChange={(e) => { setPassengerId(e.target.value) }} />
                </label>
                <label>ride:
                    <input type="text" name="ride" placeholder="Enter the ride" onChange={(e) => { setRide(e.target.value) }} />
                </label>
                <label>status:
                    <input type="text" name="status" placeholder="Enter the status" onChange={(e) => { setStatus(e.target.value) }} />
                </label>
                <label>bookingDate:
                    <input type="text" name="bookingDate" placeholder="Enter the bookingDate" onChange={(e) => { setBookingDate(e.target.value) }} />
                </label>
                <label>seatsBooked:
                    <input type="text" name="seatsBooked" placeholder="Enter the seatsBooked" onChange={(e) => { setSeatsBooked(e.target.value) }} />
                </label>
            </form>
        </div>
    )
}

export default CreateBooking;