import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
// import "./Booking.css";

function UpdateBooking() {
    const [passengerId, setPassengerId] = useState("");
    const [ride, setRide] = useState("");
    const [status, setStatus] = useState("pending");
    const [bookingDate, setBookingDate] = useState("");
    const [seatsBooked, setSeatsBooked] = useState("");

    const navigate = useNavigate();
    const { bookingId } = useParams();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        axios.get(`${API_URL}/api/bookings/${bookingId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                const booking = response.data;
                setPassengerId(booking.passengerId);
                setRide(booking.ride._id);
                setStatus(booking.status);
                setBookingDate(booking.bookingDate);
                setSeatsBooked(booking.seatsBooked);
            })
            .catch((error) => console.log(error));
    }, [bookingId]);


    const handleUpdate = (e) => {
        e.preventDefault();
        const requestBody = { passengerId, ride, status, bookingDate, seatsBooked };

        const storedToken = localStorage.getItem('authToken');

        axios.patch(`${API_URL}/api/bookings/${bookingId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` }, })
            .then((response) => {
                navigate(`/bookings`)
            }) .catch((error) => console.log(error));
    };


    const deleteBooking = () => {
        const storedToken = localStorage.getItem('authToken');

        axios.delete(`${API_URL}/api/bookings/${bookingId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => navigate("/bookings"))
            .catch((error) => console.log(error));
    };



    return (
        <div className="updateBooking">
            <h3>Update Booking</h3>
            <form onSubmit={handleUpdate}>
                <label>PassengerId:
                    <input type="text" value={passengerId} onChange={(e) => { setPassengerId(e.target.value) }} />
                </label>
                <label>Ride:
                    <input type="text" value={ride} onChange={(e) => { setRide(e.target.value) }} />
                </label>
                <label>Booking Date:
                    <input type="text"  value={bookingDate ? new Date(bookingDate).toLocaleString() : ""}  onChange={(e) => { setBookingDate(e.target.value) }} />
                </label>
                <label>Seats Booked:
                    <input type="text" value={seatsBooked} onChange={(e) => { setSeatsBooked(e.target.value) }} />
                </label>
                <label>Status:
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </label>
                <button type="submit">Update Booking 🛠️ </button>
            </form>
            <button onClick={deleteBooking}>Delete Booking 🗑️ </button>
        </div>
    )
}

export default UpdateBooking;