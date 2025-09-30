import React from "react";
import Navbar from "../components/Navbar";

const Reporting = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Reporting</h1>
        <p>This page is only visible to admins. Here you can view reports.</p>
      </div>
    </>
  );
};

export default Reporting;
