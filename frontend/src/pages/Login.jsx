import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../src/index.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      console.log("ROLE STORED:", localStorage.getItem("role"));

      alert("Login successful!");

      if (res.data.role === "admin") {
        navigate("/admin");
      } else if (res.data.role === "employee" || res.data.role === "user") {
        navigate("/user");
      } else {
        alert("Unauthorized role");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn login-button">
            Login
          </button>
        </form>
        
        <p className="register-link">
          Don't have an account? <Link to="/register" className="link">Register here</Link>
        </p>
        
        <p className="back-link">
          <Link to="/" className="link">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;