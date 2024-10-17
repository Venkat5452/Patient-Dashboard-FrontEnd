import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PatientDetails from './components/Patientdetails';
import PriorAuthorizationForm from './components/PriorAuthorizationForm';
import AddPatient from './components/Addpatient';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <>
    <div>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/add-patient" element={<AddPatient/>} />
          <Route path="/patient/:id" element={<PatientDetails/>} />
          <Route path="/prior-authorization/:id" element={<PriorAuthorizationForm/>} />
        </Routes>
    </div>
    </>
  );
}

export default App;
