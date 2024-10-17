import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from './helper';
import { FaUserPlus, FaUser, FaHeartbeat, FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // State to manage loading
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (!localStorage.getItem('logintoken')) {
      navigate("/");
    } else {
      const fetchPatients = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
          const result = await axios.get(BASE_URL + '/getallpatients');
          setPatients(result.data);
        } catch (error) {
          console.error("Error fetching patients:", error);
          // Optionally handle the error here (e.g., show an alert)
        } finally {
          setLoading(false); // Set loading to false after fetching data
        }
      };
      fetchPatients();
    }
  }, [navigate]);

  // Function to navigate to the Prior Authorization form
  const handleAddAuthorization = (patientId) => {
    navigate(`/prior-authorization/${patientId}`);
  };

  // Logout handler
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('logintoken'); // Remove token
      localStorage.removeItem('username');
      navigate("/"); // Redirect to login
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Patient Dashboard</h1>

      {/* Logout Button */}
      <div className="text-end mb-4">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Add Patient Button */}
      <div className="text-end mb-4">
        <Link to="/add-patient" className="btn btn-success">
          <FaUserPlus className="me-2" /> Add New Patient
        </Link>
      </div>

      {/* Search Bar */}
      <div className="input-group mb-4">
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search patients by name...."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center">
          <p>Loading patients...</p> {/* You can replace this with a spinner or other loading indicator */}
        </div>
      ) : (
        // Grid Layout for Patient Cards
        <div className="row">
          {patients
            .filter((patient) =>
              patient.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((patient) => (
              <div key={patient._id} className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FaUser className="me-2" /> {patient.name}
                    </h5>
                    <p className="card-text">
                      <FaHeartbeat className="me-2" /> Condition: {patient.condition}
                    </p>
                    <p className="card-text">
                      <strong>Age:</strong> {patient.age} years
                    </p>
                    {/* View Details Button */}
                    <Link to={`/patient/${patient._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                    {/* Add Authorization Button */}
                    <button
                      className="btn btn-secondary ms-2"
                      onClick={() => handleAddAuthorization(patient._id)}
                    >
                      Add Prior Authorization
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
