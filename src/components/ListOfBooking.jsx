import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/Booking.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

function ListOfBooking() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const getAllBookings = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data)
        setBookings(response.data)
      })
      .catch((error) => console.log(error));
  };

  const getAllUsers = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data)
        setUsers(response.data)
      })
      .catch((error) => console.log(error));
  };
  const handleEdit = (bookingId) => {
    navigate(`/bookings/${bookingId}`);
  };
  useEffect(() => {
    getAllBookings();
    getAllUsers();
  }, []);

  return (
    <div className="BookingsList">

      {bookings.length === 0 ? (
        <p>No bookings available.</p>) : (
        bookings.map((booking) => (
          <div key={booking._id}>
            <label className="booking">
              <label>Passenger: {users.name}
                <p>Seats Booked: {booking.seatsBooked}</p>
              </label>

              {booking.ride && (
                <label className="rideInfo">

                  <p>Origin: {booking.ride.origin}</p>
                  <p>Destination: {booking.ride.destination}</p>
                  <p>Travel Date: {new Date(booking.ride.travelDate).toISOString().split('T')[0]}</p>
                  <p>Start Time: {booking.ride.startTime} hrs</p>
                  <p>End Time: {booking.ride.endTime} hrs</p>

                </label>

              )}

              <label className={booking.status}>Status:{booking.status}</label>
              <Button variant="filled" color="red" radius="xl"
                onClick={() => handleEdit(booking._id)}>Edit Booking</Button>
            </label>
          </div>
        ))
      )}

    </div>
  );
}

export default ListOfBooking;