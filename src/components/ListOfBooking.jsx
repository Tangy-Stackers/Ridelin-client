import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import axios from "axios";
// import "./Booking.css";
import { useNavigate } from "react-router-dom";

function ListOfBooking() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();


  const getAllBookings = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setBookings(response.data))
      .catch((error) => console.log(error));
  };
const handleEdit = (bookingId) => {
  navigate(`/bookings/${bookingId}`);
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
              <h3> Booking_id: {booking._id} </h3>
          <h3>Passenger_Id:{booking.passengerId}</h3> 
          <p>Date:{new Date(booking.bookingDate).toLocaleString()}</p>
          <p>seatsBooked:{booking.seatsBooked}</p>
        
         
          {booking.ride && (
            <label className="rideInfo">
            <p>Ride_id:{booking.ride._id}</p> 
            <p>Origin:{booking.ride.origin}</p> 
            <p>Destination:{booking.ride.destination}</p> 
            <p>Travel Date:{booking.ride.travelDate}</p> 
            <p>Start Time:{booking.ride.StartTime}</p> 
            <p>End Time:{booking.ride.EndTime}</p> 
            <p>Driver_id:{booking.ride.driverId}</p> 
            </label>
           
          )}
          <label className={booking.status}>Status:{booking.status}</label>
          <button onClick={() => handleEdit(booking._id)}>Edit Booking </button>
          </label>
        </div>
      ))
      )}
    
    </div>
  );
}

export default ListOfBooking;