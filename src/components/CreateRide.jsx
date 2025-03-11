import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import { Alert, Button, TextInput, Popover } from "@mantine/core";
import { DatePicker, TimeInput } from '@mantine/dates';
import { dateFormatter } from "../utils/dateFormatter";

function CreateRide() {
    const userId = localStorage.getItem('userId')
    const storedToken = localStorage.getItem("authToken");
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const navigate = useNavigate();

    const [CreateRideData, SetCreateRideData] = useState({
        origin: " ",
        destination: " ",
        seatsAvailable: " ",
        price: " ",
        travelDate: "",
        startTime: "",
        endTime: "",
        distance: "",
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
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )

            .then((response) => {
                console.log('Succeful ride created', response.data)
                const newRideId = response.data._id;
                navigate(`/ride/${newRideId}`)
            })

            .catch(e => console.log(" Error creating the new ride ...", e))

        console.log("Form Submitted:", CreateRideData);
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
            <h1>Create a Ride</h1>

            <div className="mb-4">
                <label className="block text-sm font-medium">Start location:</label>
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
                <label className="block text-sm font-medium">End location:</label>
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
                <label className="block text-sm font-medium">Travel Date:</label>
                <Popover opened={isDatePickerOpen} onClose={() => setIsDatePickerOpen(false)} position="bottom" withArrow>
                    <Popover.Target>
                        <TextInput
                            value={selectedDate ? dateFormatter(selectedDate) : ""}
                            placeholder="Select a Date"
                            onClick={() => setIsDatePickerOpen(true)}
                            readOnly
                        />
                    </Popover.Target>
                    <Popover.Dropdown>
                        <DatePicker
                            value={selectedDate}
                            onChange={(date) => {
                                setSelectedDate(date);
                                setIsDatePickerOpen(false);
                            }}
                        />
                    </Popover.Dropdown>
                </Popover>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">Start Time:</label>
                <TimeInput
                    name="startTime"
                    value={CreateRideData.startTime}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">Approximate End Time:</label>
                <TimeInput
                    name="endTime"
                    value={CreateRideData.endTime}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">Approximate Distance:</label>
                <input
                    type="text"
                    name="distance"
                    value={CreateRideData.distance}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">Seats Available:</label>
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
                <label className="block text-sm font-medium">Price (per person):</label>
                <input
                    type="text"
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