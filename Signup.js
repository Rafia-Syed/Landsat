import React from "react";
import "./Form.css";

const Signup = () => {
  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
