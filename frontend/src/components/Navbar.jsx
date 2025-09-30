import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/dashboard">Dashboard</Link>

      {auth?.user?.role === "admin" && (
        <>
          {" | "}
          <Link to="/reporting">Reporting</Link>
          {" | "}
          <Link to="/expenses">Expenses</Link>
        </>
      )}

      {auth ? (
        <>
          {" | "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {" | "}
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
