import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { BASE_URL } from './helper';

const AddPatient = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [addedby, setAddedBy] = useState(localStorage.getItem('username'));
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    try {
      const newPatient = {
        name,
        age,
        condition,
        medicalHistory: medicalHistory.split(',').map(item => item.trim()), // Convert string to array
        treatmentPlan,
        addedby
      };
      console.log(newPatient);
      await axios.post(BASE_URL + '/addpatient', newPatient);
      alert('Patient added successfully!');
      navigate('/'); // Redirect to the patient dashboard after adding
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Failed to add patient. Please try again.');
    } finally {
      setLoading(false); // Reset loading state after the request completes
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">
          <FaUserPlus className="me-2" /> Add New Patient
        </h2>
        {loading && <p className="text-center text-success">Processing...</p>} {/* Display Processing message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading} // Disable input fields when loading
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              disabled={loading} // Disable input fields when loading
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Condition</label>
            <input
              type="text"
              className="form-control"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
              disabled={loading} // Disable input fields when loading
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Medical History (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              required
              disabled={loading} // Disable input fields when loading
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Treatment Plan</label>
            <input
              type="text"
              className="form-control"
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
              required
              disabled={loading} // Disable input fields when loading
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}> {/* Disable button when loading */}
            {loading ? 'Processing...' : 'Add Patient'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary ms-3" 
            onClick={() => navigate('/')} // Close button navigates to dashboard
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
