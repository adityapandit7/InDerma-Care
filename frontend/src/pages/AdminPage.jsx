import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

const AdminPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLogs: 0,
    todayLogs: 0,
    uniqueUsers: 0,
    uniqueHospitals: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs();
    calculateStats();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await API.get("/userlogs/all");
      setLogs(res.data);
      setLoading(false);
    } catch (err) {
      alert("Access denied or error fetching logs");
      setLoading(false);
    }
  };

  const calculateStats = () => {
    // This would ideally come from your backend API
    // For now, we'll calculate from the logs data
    const today = new Date().toDateString();
    const todayLogs = logs.filter(log => 
      new Date(log.datetime).toDateString() === today
    );
    
    const uniqueUsers = new Set(logs.map(log => log.user?.email)).size;
    const uniqueHospitals = new Set(logs.map(log => log.hospital)).size;

    setStats({
      totalLogs: logs.length,
      todayLogs: todayLogs.length,
      uniqueUsers,
      uniqueHospitals
    });
  };

  const handleDeleteLog = async (logId) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      try {
        await API.delete(`/userlogs/${logId}`);
        alert("Log deleted successfully!");
        fetchLogs(); // Refresh the list
      } catch (err) {
        alert("Error deleting log");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out successfully!");
    navigate("/");
  };

  const exportToCSV = () => {
    const headers = ["#", "User", "Email", "Headquarters", "Address", "Hospital/Pharmacy", "Doctor", "Latitude", "Longitude", "Date & Time"];
    const csvData = logs.map((log, index) => [
      index + 1,
      log.user?.name || "N/A",
      log.user?.email || "N/A",
      log.headquarters,
      log.address,
      log.hospital,
      log.doctor,
      log.geoLocation?.lat || "N/A",
      log.geoLocation?.lon || "N/A",
      new Date(log.datetime).toLocaleString()
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(field => `"${field}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `user_logs_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="admin-page-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage and monitor all user submissions</p>
        </div>
        <div className="header-actions">
          <button onClick={exportToCSV} className="export-btn">
            Export CSV
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-info">
            <h3>{stats.totalLogs}</h3>
            <p>Total Submissions</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon today">📅</div>
          <div className="stat-info">
            <h3>{stats.todayLogs}</h3>
            <p>Today's Submissions</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon users">👥</div>
          <div className="stat-info">
            <h3>{stats.uniqueUsers}</h3>
            <p>Unique Users</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon hospital">🏥</div>
          <div className="stat-info">
            <h3>{stats.uniqueHospitals}</h3>
            <p>Unique Hospitals</p>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="table-container">
        <div className="table-header">
          <h2>User Submissions</h2>
          <div className="table-actions">
            <span className="total-count">{logs.length} records</span>
            <button onClick={fetchLogs} className="refresh-btn">
              🔄 Refresh
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="user-logs-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Headquarters</th>
                <th>Address</th>
                <th>Hospital/Pharmacy</th>
                <th>Doctor</th>
                <th>Location</th>
                <th>Date & Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <tr key={log._id}>
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <div className="user-info">
                        <div className="user-name">{log.user?.name || "N/A"}</div>
                      </div>
                    </td>
                    <td>
                      <div className="email-cell">{log.user?.email || "N/A"}</div>
                    </td>
                    <td>
                      <span className="badge">{log.headquarters}</span>
                    </td>
                    <td className="address-cell">{log.address}</td>
                    <td>{log.hospital}</td>
                    <td>{log.doctor}</td>
                    <td>
                      {log.geoLocation?.lat && log.geoLocation?.lon ? (
                        <a
                          href={`https://maps.google.com/?q=${log.geoLocation.lat},${log.geoLocation.lon}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="map-link"
                        >
                          View Map
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      <div className="datetime-cell">
                        {new Date(log.datetime).toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteLog(log._id)}
                        className="delete-btn"
                        title="Delete Record"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="no-data">
                    <div className="no-data-content">
                      <p>No records found</p>
                      <button onClick={fetchLogs} className="retry-btn">
                        Try Again
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;