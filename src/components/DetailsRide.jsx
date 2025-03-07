// import { useEffect,useState } from "react";
// import {}
// import axios from 'axios';

function DetailsRide(){
//     const userId = localStorage.getItem('userId')
//     const storedToken = localStorage.getItem("authToken");
//     const navigate = useNavigate();

//     const [profileDetails, setProfileDetails] = useState();
    

//     useEffect(()=>{
//         axios.get(`${API_URL}/`,
//             { headers: { Authorization: `Bearer ${storedToken}`} 
//         })
        
        
//         .then((response)=>{
//             console.log('user details found',response.data)
//             setProfileDetails(response.data)
//                 navigate(`/user/${userId}`)})
//         .catch(e=>{console.log('Error getting the user data',e)})
//     },[storedToken])

//     if (!profileDetails) return <p>Loading...</p>;
        
    
    return(
        <div>
            <h2 className="text-xl font-semibold"> Ride Details</h2>
            
        </div>
    )

}

export default DetailsRide;