import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Popover, RadioGroup, Radio, Group, Container, Paper, Title, Divider, Stack, Flex, Box } from "@mantine/core";
import { DatePicker, TimeInput } from '@mantine/dates';
import { dateFormatter } from "../utils/dateFormatter";
import Sidebar from "./Sidebar";


function CreateRide() {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    const storedToken = localStorage.getItem("authToken");
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");


    const navigate = useNavigate();

    const [CreateRideData, SetCreateRideData] = useState({
        origin: "",
        destination: "",
        seatsAvailable: "",
        price: "",
        travelDate: "",
        startTime: "",
        endTime: "",
        distance: "",
        vehicle: "",
        licensePlate: "",
        music: "false",
        smokingAllowed: "false",
        petsAllowed: "false",
        waypoints: [],
        driverId: userId,
    });

    const handleChange = (e) => {
        SetCreateRideData({
            ...CreateRideData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeRadio = (item, value) => {
        SetCreateRideData({
            ...CreateRideData,
            [item]: value,
        });

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API_URL}/api/ride`, CreateRideData,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then((response) => {
                // console.log('Successful ride created', response.data);
                const newRideId = response.data._id;
                navigate(`/ride/${newRideId}`);
            })
            .catch(e => console.log("Error creating the new ride ...", e));
    };

    return (
        <Flex style={{ height: "100vh" }}>
        <Box w="250px">
            <Sidebar/>
        </Box>
        <Flex justify="center" style={{ flex: 0.75 }}>
        <Container px={24} size="lg">
            <>
                <br />
                <Title order={2} align="center">Create a Ride</Title>
                <Divider my="md" />
                <Title order={4} align="center" mb="lg">Were are we travel today, {userName}?</Title>
            </>

            <Flex
                mih={50}
                gap="lg"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
            >

                <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }} >
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>

                        <Paper shadow="xs" p="xl" radius="md" withBorder>

                            <TextInput label="📍 Start Location" name="origin" value={CreateRideData.origin} onChange={handleChange} required />
                            <TextInput label="📍 End Location" name="destination" value={CreateRideData.destination} onChange={handleChange} required />
                            <TextInput label="📍 Waypoint" name="waypoints" value={CreateRideData.waypoints} onChange={handleChange} required />
                            <Popover opened={isDatePickerOpen} onClose={() => setIsDatePickerOpen(false)} position="bottom" withArrow>
                                <Popover.Target>
                                    <TextInput
                                        label="📅 Travel Date"
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
                                            SetCreateRideData(prevData => ({
                                                ...prevData,
                                                travelDate: date.toISOString().split("T")[0]
                                            }));
                                            setIsDatePickerOpen(false);
                                        }}
                                    />
                                </Popover.Dropdown>
                            </Popover>

                        </Paper>
                        <Paper shadow="xs" p="xl" radius="md" withBorder>

                            <TimeInput label="⏰ Start Time" name="startTime" value={CreateRideData.startTime} onChange={handleChange} required />
                            <TimeInput label="⌛ Approx. End Time" name="endTime" value={CreateRideData.endTime} onChange={handleChange} required />
                            <TextInput label="📏 Approx. Distance (km)" name="distance" value={CreateRideData.distance} onChange={handleChange} required />

                        </Paper>
                        <Paper shadow="xs" p="xl" radius="md" withBorder>

                            <TextInput label="🪑 Seats Available" name="seatsAvailable" value={CreateRideData.seatsAvailable} onChange={handleChange} required />
                            <TextInput label="💰 Price (per person) (€)" name="price" value={CreateRideData.price} onChange={handleChange} required />
                            <TextInput label="🚙 Vehicle Type" name="vehicle" value={CreateRideData.vehicle} onChange={handleChange} required />
                            <TextInput label="🔢 License Plate" name="licensePlate" value={CreateRideData.licensePlate} onChange={handleChange} />
                        </Paper>
                        <Paper shadow="xs" p="xl" radius="md" withBorder>
                            <Flex direction="row" gap="lg" wrap="wrap">
                                <Group>
                                    <RadioGroup
                                        label="🎶 Music"
                                        value={CreateRideData.music}
                                        onChange={(value) => handleChangeRadio("music", value)}
                                        name="music"
                                    >
                                        <Radio
                                            value="true"
                                            label="Yes"
                                        />
                                        <Radio
                                            value="false"
                                            label="No"
                                        />
                                    </RadioGroup>
                                </Group>

                                <Group>
                                    <RadioGroup
                                        label="🚬 Smoking Allowed"
                                        value={CreateRideData.smokingAllowed}
                                        onChange={(value) => handleChangeRadio("smokingAllowed", value)}
                                        name="smokingAllowed"
                                    >
                                        <Radio
                                            value="true"
                                            label="Yes"
                                          
                                        />
                                        <Radio
                                            value="false"
                                            label="No"
                                          
                                        />
                                    </RadioGroup>

                                </Group>

                                <Group>
                                    <RadioGroup 
                                        label="🐶 Pets Allowed"
                                        value={CreateRideData.petsAllowed}
                                        onChange={(value) => handleChangeRadio("petsAllowed", value)}
                                        name="petsAllowed"
                                        >
                                        <Radio
                                            value="true"
                                            label="Yes"
                                        />
                                        <Radio
                                            value="false"
                                            label="No"
                                        />
                                    </RadioGroup>
                                </Group>

                            </Flex>
                        </Paper>

                    </div>
                    <Button type="submit" variant="filled" color={"#FF5733"} size="md" radius="xl">
                        Submit
                    </Button>

                </form>
            </Flex>
        </Container>
        </Flex>
        </Flex>
    );
}

export default CreateRide;
