import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams ,useNavigate } from 'react-router-dom';
import { BASE_URL } from './helper';
import { FaUser, FaNotesMedical,FaFileMedical, FaClipboardCheck } from 'react-icons/fa'; // Importing icons

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      const result = await axios.get(BASE_URL + '/patient/' + id);
      setPatientData(result.data);
    };
    fetchPatientDetails();
  }, [id]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  const { patient, authRequests } = patientData;

  return (
    <div className="container my-5">
    <div className="card shadow-lg p-4">
      <h2 className="text-center mb-4">
        <FaUser className="me-2" /> {patient.name}'s Health Records
      </h2>

      <ul className="list-group list-group-flush">
        {/* Patient Details */}
        <li className="list-group-item">
          <FaNotesMedical className="me-2 text-primary" />
          <strong>Age:</strong> {patient.age} years
        </li>
        <li className="list-group-item">
          <FaNotesMedical className="me-2 text-danger" />
          <strong>Condition:</strong> {patient.condition}
        </li>
        <li className="list-group-item">
          <FaNotesMedical className="me-2 text-success" />
          <strong>Treatment Plan:</strong> {patient.treatmentPlan}
        </li>
        <li className="list-group-item">
          <FaNotesMedical className="me-2 text-success" />
          <strong>Patient Added by:</strong> {patient.addedby}
        </li>

        {/* Medical History */}
        <li className="list-group-item">
          <h5 className="mt-3">
            <FaFileMedical className="me-2 text-success" /> Medical History:
          </h5>
          <ul className="list-unstyled">
            {patient.medicalHistory.map((history, index) => (
              <li key={index} className="mb-2 d-flex align-items-start">
                <FaNotesMedical className="me-2 text-warning" />
                <div>{history}</div>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      {/* Authorization Requests */}
      <h4 className="mt-5 mb-3">
        <FaClipboardCheck className="me-2 text-info" /> Prior Authorization Requests:
      </h4>
      {authRequests.length === 0 ? (
        <p>No prior authorization requests found for this patient.</p>
      ) : (
        <ul className="list-group">
          {authRequests.map((request, index) => (
            <li key={request._id} className="list-group-item mb-2">
              <div>
                <strong>Request #{index + 1}:</strong>
              </div>
              <div><strong>Treatment:</strong> {request.treatment}</div>
              <div><strong>Doctor Name:</strong> {request.doctorName}</div>
              <div><strong>Doctor's Notes:</strong> {request.doctorNotes}</div>
              <div><strong>Insurance Plan:</strong> {request.insurancePlan}</div>
              <div><strong>Diagnosis Code:</strong> {request.diagnosisCode}</div>
              <div><strong>Date of Service:</strong> {new Date(request.dateOfService).toLocaleDateString()}</div>
              <div><strong>Status:</strong> <span className={`badge ${request.status === 'pending' ? 'bg-warning' : 'bg-success'}`}>{request.status}</span></div>
              <div><strong>Request Timestamp:</strong> {new Date(request.timestamp).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
      <button className="btn btn-danger mb-3"onClick={() => navigate(-1)} // Navigate back to the previous page
      >Close</button>
    </div>
  </div>
  );
};

export default PatientDetails;
