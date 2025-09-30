import React from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>
        <p>Welcome to the Pharma Website! This is the user dashboard.</p>
      </div>
    </>
  );

  
};

export default Dashboard;
