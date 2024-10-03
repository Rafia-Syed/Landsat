import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [showForm, setShowForm] = useState(null); // To toggle between login and signup

  return (
    <div className="app">
      {!showForm && (
        <div className="welcome-container">
          <h1>Welcome to Our Web App</h1>
          <p>Select an option to continue</p>
          <div className="buttons">
            <button className="btn login-btn" onClick={() => setShowForm("login")}>Login</button>
            <button className="btn signup-btn" onClick={() => setShowForm("signup")}>Signup</button>
          </div>
        </div>
      )}
      {showForm === "login" && <Login />}
      {showForm === "signup" && <Signup />}
    </div>
  );
}

export default App;
