import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, TextInput, Popover } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import { dateFormatter } from "../utils/dateFormatter";





function SearchRide({ originValue, destinationValue, dateValue, navigateCallback = (origin, destination) => { } }) {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
    
    const handleSearch = () => {
        const isLoggedIn = localStorage.getItem('authToken')
        if (!origin || !destination) {
            setAlertMessage("Please enter both Origin and Destination");
            setShowAlert(true);
            return;
        }
        const date = selectedDate ? selectedDate.toLocaleDateString() : ""
        if (isLoggedIn) {
            navigateCallback(origin, destination, date);
            navigate(`/rides?origin=${origin}&destination=${destination}&date=${date}`);
        } else {
            setAlertMessage("Login to continue");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                navigate('/login');
            ;
        }, 5000);
        }
    };

    useEffect(() => {
        if (originValue != null) {
            setOrigin(originValue)
        }
        if (destinationValue != null) {
            setDestination(destinationValue)
        }
        if (dateValue != null) {
            const dateObj = new Date(dateValue);
            setSelectedDate(dateObj)
        }
    }, [originValue, destinationValue, dateValue]);

    console.log("selected date:", selectedDate)


    return (
        <>
            {/*  <h3>Search for a Ride</h3>*/}
            <div className="searchRide">
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
                                value={selectedDate ? dateFormatter(selectedDate) : ""}

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
                <Button onClick={() => handleSearch()} color="indigo" radius="md" mt="lg">Search</Button>
                {showAlert && (
                    <Alert
                        variant="light"
                        color="red"
                        radius="lg"
                        withCloseButton title="Alert!"
                        onClose={() => { setShowAlert(false); navigate('/login'); }}
                    >
                        {alertMessage}
                    </Alert>
                )}
            </div>
        </>
    );
}
export default SearchRide;