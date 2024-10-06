import React, { useState } from "react";
import axios from "axios"; // Make sure axios is imported
import "./Form.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username: formData.username,
        password: formData.password,
      });
      
      if (response.data.message === "Login successful!") {
        alert("Login successful! Redirecting to home page.");
        window.location.href = "/home"; // Redirect to home or dashboard after successful login
      }
    } catch (error) {
      setError("Login failed! Please try again.");
      console.error("Login failed:", error.response.data.message);
    }
  };


  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <div className="error-text">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
