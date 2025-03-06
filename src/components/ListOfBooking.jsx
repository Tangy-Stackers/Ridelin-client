import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import axios from "axios";

function ListOfBooking() {
  const [bookings, setBookings] = useState([]);

  const getAllBookings = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setBookings(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div className="BookingsList">
       
        {bookings.length === 0 ? (
        <p>No bookings available.</p> ) : (
      bookings.map((booking) => (
        <div key={booking._id}>
            <label className="booking">
          <h3>Passenger_Id:{booking.passengerId}</h3> 
          <p>Date:{booking.bookingDate}</p>
          <p>seatsBooked:{booking.seatsBooked}</p>
          </label>
         
          {booking.ride && (
            <label className="rideInfo">
            <p>Ride_id:{booking.ride.rideId}</p> 
            <p>Origin:{booking.ride.origin}</p> 
            <p>Destination:{booking.ride.destination}</p> 
            <p>Travel Date:{booking.ride.travelDate}</p> 
            <p>Start Time:{booking.ride.StartTime}</p> 
            <p>End Time:{booking.ride.EndTime}</p> 
            <p>Driver_id:{booking.ride.driverId}</p> 
            </label>
          )}
          <label>Status:{booking.status}</label>
        </div>
      ))
      )}
    </div>
  );
}

export default ListOfBooking;