import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import "./UserPage.css"; // We'll create this CSS file

const UserPage = () => {
  const [datetime, setDatetime] = useState("");
  const [headquarters, setHeadquarters] = useState("Kathmandu");
  const [address, setAddress] = useState("");
  const [hospital, setHospital] = useState("");
  const [doctor, setDoctor] = useState("");
  const [geoLocation, setGeoLocation] = useState({ lat: null, lon: null });
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-fill date & time in proper format
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '');
    setDatetime(formattedDateTime);

    // Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeoLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Location error:", err);
        }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/userlogs", {
        datetime,
        headquarters,
        address,
        hospital,
        doctor,
        geoLocation,
      });
      alert("Data saved successfully!");
      // Reset form
      setAddress("");
      setHospital("");
      setDoctor("");
      navigate("/"); // Redirect back to landing page after submit
    } catch (err) {
      alert(err.response?.data?.message || "Error saving data");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="user-page-container">
      {/* Header */}
      <div className="user-header">
        <h1>User Page</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* Form */}
      <div className="user-form-container">
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label className="form-label">Date & Time</label>
            <input
              type="text"
              value={datetime}
              disabled
              className="date-time-display"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Headquarters</label>
            <select
              value={headquarters}
              onChange={(e) => setHeadquarters(e.target.value)}
              className="form-input"
            >
              {[
                "Kathmandu",
                "Biratnagar",
                "Janakpur",
                "Lahan",
                "Birgunj",
                "Pokhara",
                "Butwal",
                "Narayanghat",
              ].map((hq) => (
                <option key={hq} value={hq}>
                  {hq}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Address (Location)</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              placeholder="Enter address"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hospital / Pharmacy</label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="form-input"
              placeholder="Enter hospital/pharmacy"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Doctor's Name</label>
            <input
              type="text"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="form-input"
              placeholder="Enter doctor's name"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;