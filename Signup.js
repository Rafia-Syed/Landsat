import React, { useState } from "react";
import { useValidations } from "./components/Validations";
import axios from "axios"; // Ensure axios is installed in your project
import "./Form.css";

const Signup = () => {
  const { validateEmail, validatePassword, validateUsername } = useValidations(); 
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({ username: "", email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (usernameError || emailError || passwordError) {
      setErrors({ username: usernameError, email: emailError, password: passwordError });
    } else {
      try {
        const response = await axios.post("http://localhost:5000/signup", formData);
        if (response.data.message === "Signup successful!") {
          setSuccessMessage("Signup successful! Redirecting to login page...");
          setTimeout(() => {
            window.location.href = "/login"; // Redirect after a delay
          }, 2000);
        }
      } catch (error) {
        console.error("Signup failed:", error.response.data.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      {successMessage && <div className="success-text">{successMessage}</div>}
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
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
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
