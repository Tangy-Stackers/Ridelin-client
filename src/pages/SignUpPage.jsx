import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";


function SignUp(){
    const navigate = useNavigate();

    const [SignUpData, SetSignUpData] = useState({
        name: "",
        email: "",
        password: "",
      });
    const handleChange = (e) => {
        SetSignUpData({
          ...SignUpData,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();

         // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(SignUpData.email)) {
            alert("Please enter a valid email address.");
        return;
        }

        // Validate password format
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordPattern.test(SignUpData.password)) {
            alert ("password needs at least 8 characters and simbols");
        return;
        }
        //Creating account on API
        axios.post(`${API_URL}/auth/signup`, SignUpData)
            .then(respond =>{ navigate("/")})
            .catch(e => console.log(" Error creating the new account ...",e));
      
          
    }
        console.log("Form Submitted:", SignUpData);

    
    return (
  
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
            <h1>Signup</h1>
            <div className="mb-4">
            <label className="block text-sm font-medium">Name:</label>
            <input
                type="text"
                name="name"
                value={SignUpData.name}
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
                value={SignUpData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium">Password:</label>
            <input
                name="password"
                type="password"
                value={SignUpData.message}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
    );
}

export default SignUp;