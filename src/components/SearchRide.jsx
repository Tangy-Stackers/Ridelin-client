import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput,Popover } from "@mantine/core";
import { DatePicker } from '@mantine/dates';


function SearchRide() {

    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [selectedDate, setSelectedDate] = useState(null); 
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const navigate = useNavigate();

    const handleSearch = () => {
        const isLoggedIn = localStorage.getItem('authToken')
        if(isLoggedIn){
            navigate(`/rides?origin=${origin}&destination=${destination}&date=${selectedDate ? selectedDate.toISOString() : ""}`);
        }else {
            alert("Login to continue");
            navigate('/login');
        }
    };


    return (
        <div className="searchRide">
            <h3>Search for a Ride</h3>
            <div className="searchInputs">
                <TextInput
                    label="Origin"
                    value={origin}
                    placeholder="Enter Origin"
                    onChange={(e) => setOrigin(e.target.value)}
                />
                <TextInput
                    label="Destination"
                    value={destination}
                    placeholder="Enter Destination"
                    onChange={(e) => setDestination(e.target.value)}
                />
                  <Popover
                    opened={isDatePickerOpen}
                    onClose={() => setIsDatePickerOpen(false)}
                    position="bottom"
                    withArrow
                >
                    <Popover.Target>
                        <TextInput
                            label="Travel Date"
                            value={selectedDate ? selectedDate.toLocaleDateString() : ""}
                            placeholder="Select a Date"
                            onClick={() => setIsDatePickerOpen(true)} // Open on click
                            readOnly
                        />
                    </Popover.Target>
                    <Popover.Dropdown>
                        <DatePicker
                            value={selectedDate}
                            onChange={(date) => {
                                setSelectedDate(date);
                                setIsDatePickerOpen(false); // Close when date is selected
                            }}
                            classNames={{
                                calendarBase: "small-calendar",
                                day: "small-calendar-day",
                                month: "small-calendar-month",
                                weekday: "small-calendar-weekday"
                            }}
                        />
                    </Popover.Dropdown>
                </Popover>
            </div>
            <Button onClick={handleSearch} color="indigo" radius="md" mt="lg">Search</Button>
        </div>

    );
}

export default SearchRide;