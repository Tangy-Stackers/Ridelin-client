# RIdELIN-project 🚗👫👫

## Description:

Ridelin is a carpooling platform designed to connect users who want to share rides, aiming to reduce commuting costs, lessen traffic congestion, and lower carbon emissions. The website enables users to create profiles, offer or request carpool rides, and view available options based on their location, travel times, and preferences.

### Key Features:

1. **User Profiles**: Users can create and manage profiles with personal details and carpool preferences.
2. **Rides Management**:Users can create or delete rides by specifying preferences such as the number of passengers, pick-up/drop-off locations, and travel times.
3. **Booking Management**: Users can select a ride, book it, update their booking details, or delete their booking if necessary.

## Repository Overview:

This repository contains the **Frontend** for the carpooling project, which is built using **React**. It handles the user interface and client-side interactions, providing a seamless experience for users to search, book rides, and manage their profiles.
The Backend, which is built using Express API, is in a separate repository and handles all server-side operations, such as user authentication, ride matching, and data management.

- **Frontend (React)**: This repository contains the UI components, routes, and logic that runs on the client-side, interacting with the backend API to fetch data and display it to users.

- **Backend (Express)**: The backend repository (located at (https://github.com/Tangy-Stackers/Ridelin-server)) contains the server-side logic, database interactions, and API endpoints that power the features in the frontend.

## Instructions:

1. Clone the Repository using :git clone --respository--
2. Navigate into the project directory: cd ridelin
3. Install Dependencies: npm install
4. Set up Environment Variables: You will need to create a .env file in the root of your project directory to configure environment variables for the app. This is where you will store sensitive information like database credentials, API keys, and other necessary configuration.
   - To create the .env file:
      * In the project folder, create a new file named .env.
      * Add Environment Variables
        - **PORT**: The port your frontend will run on (default is 3000 for React)
          PORT=5003
        - **TOKEN_SECRET**: Secret key used for JWT authentication (same as the backend secret)
          TOKEN_SECRET= carpool or newidea
        - **VITE_API_URL**: The URL of the backend API (where your Express server is running)
          VITE_API_URL="http://localhost:5003"
    - Save and close .env File:
5. Run the Application: npm run dev


## Important Notes:
* If you need to update these values (e.g., change the backend URL or port), simply modify the .env file.
* React will automatically pick up the environment variables and use them when running the app in development.

## Demo:
https://ridelin.netlify.app/