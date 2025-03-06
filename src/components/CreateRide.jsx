
import { useState } from "react";


function CreateRide(){
    const [CreateRideData, SetCreateRideData] = useState({
        name: "",
        email: "",
        password: "",
      });
    const handleChange = (e) => {
        SetCreateRideData({
          ...CreateRideData,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();

         // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(CreateRideData.email)) {
            alert("Please enter a valid email address.");
        return;

        // Validate password format temporay format
       

        
  }
        console.log("Form Submitted:", CreateRideData);
      };
    
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
            <h1>Create a Ride</h1>
            <div className="mb-4">
            <label className="block text-sm font-medium">Name:</label>
            <input
                type="text"
                name="name"
                value={CreateRideData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium">Email:</label>
            <input
                type="email"
                name="email"
                value={CreateRideData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium">Password:</label>
            <textarea
                name="password"
                value={CreateRideData.message}
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