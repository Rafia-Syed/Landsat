import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./components/Dashboard"; // The next page after login

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to Our Web App</h1>
      <p>Select an option to continue</p>
      <div className="buttons">
        <button className="btn login-btn" onClick={() => navigate("/login")}>Login</button>
        <button className="btn signup-btn" onClick={() => navigate("/signup")}>Signup</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Next page after login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
