import React from "react";
import Navbar from "../components/Navbar";

const Expenses = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Expense Sheet</h1>
        <p>This page is only visible to admins. Track and manage expenses here.</p>
      </div>
    </>
  );
};

export default Expenses;
