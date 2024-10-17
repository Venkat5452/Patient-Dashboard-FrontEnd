import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './helper'; // Ensure you have the correct path for your helper file
import { FaTimes } from 'react-icons/fa'; // Importing the close icon

const PriorAuthorizationForm = () => {
  const { id } = useParams(); // Get the patient ID from the URL
  const [patientData, setPatientData] = useState(null);
  const [treatment, setTreatment] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [insurancePlan, setInsurancePlan] = useState('');
  const [diagnosisCode, setDiagnosisCode] = useState('');
  const [dateOfService, setDateOfService] = useState('');
  const [doctorName, setDoctorName] = useState(localStorage.getItem('username'));
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [resultMessage, setResultMessage] = useState(''); // State for result message
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patient data using the ID
    if (!localStorage.getItem('logintoken')) {
      navigate("/");
    }
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(BASE_URL + "/patient/" + id);
        setPatientData(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDoctorName(localStorage.getItem('username'));
    const authRequest = {
      patientId: id,
      treatment,
      doctorName,
      doctorNotes,
      insurancePlan,
      diagnosisCode,
      dateOfService,
    };

    setLoading(true); // Start loading when the request is submitted
    setResultMessage(''); // Clear previous result message

    try {
      await axios.post(BASE_URL + "/auth-requests", authRequest);
      setResultMessage('Prior authorization request submitted successfully!');
      navigate('/'); // Redirect to the dashboard or another page after submission
    } catch (error) {
      console.error('Error submitting authorization request:', error);
      setResultMessage('Failed to submit prior authorization request. Please try again.');
    } finally {
      setLoading(false); // Stop loading once the request is done
    }
  };

  const handleClose = () => {
    navigate('/'); // Close button redirects to the dashboard
  };

  if (!patientData) {
    return <div>Loading...</div>; // Display a loading state until patient data is fetched
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Prior Authorization for {patientData.name}</h2>
        {loading && <p className="text-center mt-3 text-success">Being Processed...</p>}
        {resultMessage && <p className="text-center mt-3">{resultMessage}</p>} {/* Moved here */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Treatment</label>
            <input
              type="text"
              className="form-control"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Doctor Notes</label>
            <textarea
              className="form-control"
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Insurance Plan</label>
            <input
              type="text"
              className="form-control"
              value={insurancePlan}
              onChange={(e) => setInsurancePlan(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Diagnosis Code</label>
            <input
              type="text"
              className="form-control"
              value={diagnosisCode}
              onChange={(e) => setDiagnosisCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Service</label>
            <input
              type="date"
              className="form-control"
              value={dateOfService}
              onChange={(e) => setDateOfService(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
            <button type="button" className="btn btn-danger" onClick={handleClose}>
              <FaTimes className="me-2" /> Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriorAuthorizationForm;
