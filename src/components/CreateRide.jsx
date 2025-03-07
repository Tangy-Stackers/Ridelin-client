import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";


function CreateRide() {
    const userId = localStorage.getItem('userId')
    const storedToken = localStorage.getItem("authToken");
    
    const navigate = useNavigate()
    const [CreateRideData, SetCreateRideData] = useState({
        origin: " ",
        destination: " ",
        seatsAvailable:" ",
        price: " ",
        driverId: userId,//userid
      });

    
    const handleChange = (e) => {

        SetCreateRideData({
          ...CreateRideData, 
        //   driverId: UserId, add userid to become the driver id
          [e.target.name]: e.target.value,
        });
      };

   
    const handleSubmit = (e) => {
        e.preventDefault();

        //Creating Ride on API
       
            axios.post(`${API_URL}/api/ride`, CreateRideData,
                { headers: { Authorization: `Bearer ${storedToken}`} }
            )
            
            .then((response) =>{
                console.log('Succeful ride created',response.data)
                const newRideId = response.data._id; 
                navigate(`/ride/${newRideId}`)})

            .catch(e => console.log(" Error creating the new ride ...", e) )

        
    };
    console.log("Form Submitted:", CreateRideData);

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
            <h1>Create a Ride</h1>
            <div className="mb-4">
            <label className="block text-sm font-medium">Where the ride will start?:</label>
            <input
                type="text"
                name="origin"
                value={CreateRideData.origin}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium">Where the ride will finish?</label>
            <input
                type="text"
                name="destination"
                value={CreateRideData.destination}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium">How many seat do you have available:</label>
            <input
                type="number"
                name="seatsAvailable"
                value={CreateRideData.seatsAvailable}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium">What is the price of the ride:</label>
            <input
                type="number"
                name="price"
                value={CreateRideData.price}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    );
}

export default CreateRide;