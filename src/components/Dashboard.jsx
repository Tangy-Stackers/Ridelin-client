import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Card, TextInput, Popover } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import axios from "axios";
import "../assets/Booking.css"
import SearchRide from "./SearchRide";


function Dashboard() {
    // This is meant to show details about ongoing rides, profile
    return
    <>
     <SearchRide/> 
     
     <div>
     </div>
    </>

}
export default Dashboard;