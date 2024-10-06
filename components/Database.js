// components/Database.js
import axios from 'axios'; // Axios for HTTP requests

// Example function to insert user data into the SQL database
export const addUserToDatabase = async (username, email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/signup", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Example function to check if the user exists during login
export const validateUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error validating user:", error);
  }
};
