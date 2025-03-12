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
        vehicle: "",
        licensePlate: "",
        music: "",
        smokingAllowed: "",
        petsAllowed: "",
        waypoints: [],
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
            <label><h2> 🚗 Ride  Details: </h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium">📍 Start location:</label>
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
                    <label className="block text-sm font-medium"> 📍 End location:</label>
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
                    <label className="block text-sm font-medium"> 📅 Travel Date:</label>
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
                    <label className="block text-sm font-medium"> ⏰ Start Time:</label>
                    <TimeInput
                        name="startTime"
                        value={CreateRideData.startTime}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium"> ⌛ Approx. End Time:</label>
                    <TimeInput
                        name="endTime"
                        value={CreateRideData.endTime}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
            </label>
            <label><h2>🛑 Additional Info: </h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium">📏 Approx. Distance:km</label>
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
                    <label className="block text-sm font-medium">🪑 Seats Available: </label>
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
                    <label className="block text-sm font-medium">💰 Price (per person):€</label>
                    <input
                        type="text"
                        name="price"
                        value={CreateRideData.price}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
            </label>
            <label><h2>🚘 Vehicle Details:</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium">🚙 Vehicle Type: </label>
                    <input
                        type="text"
                        name="vehicle"
                        value={CreateRideData.vehicle}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">🔢 License Plate:</label>
                    <input
                        type="text"
                        name="licensePlate"
                        value={CreateRideData.licensePlate}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
            </label>
            <label><h2>Preferences: </h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium">🎶 Music:</label>
                    <div className="radio">
                        <input
                            type="radio"
                            name="music"
                            value="true"
                            checked={CreateRideData.music === "true"}
                            onChange={handleChange}
                        /> Yes
                        <input
                            type="radio"
                            name="music"
                            value="false"
                            checked={CreateRideData.music === "false"}
                            onChange={handleChange}
                        /> No

                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">🚬 Smoking Allowed:</label>
                    <div className="radio">
                        <input
                            type="radio"
                            name="smokingAllowed"
                            value="true"
                            checked={CreateRideData.smokingAllowed === "true"}
                            onChange={handleChange}
                        /> Yes

                        <input
                            type="radio"
                            name="smokingAllowed"
                            value="false"
                            checked={CreateRideData.smokingAllowed === "false"}
                            onChange={handleChange}
                        /> No

                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">🐶 Pets Allowed:</label>
                    <div className="flex gap-4">

                        <input
                            type="radio"
                            name="petsAllowed"
                            value="true"
                            checked={CreateRideData.petsAllowed === "true"}
                            onChange={handleChange}
                        /> Yes

                        <input
                            type="radio"
                            name="petsAllowed"
                            value="false"
                            checked={CreateRideData.petsAllowed === "false"}
                            onChange={handleChange}
                        /> No

                    </div>
                </div>
            </label>
            <Button type="submit" variant="filled" size="md" radius="lg">Submit</Button>
        </form>
    );
}

export default CreateRide;