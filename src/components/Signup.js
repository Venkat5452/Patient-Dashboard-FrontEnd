import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation
import './Signup.css'; // Import the CSS file for custom styles
import axios from 'axios';
import { BASE_URL } from './helper';

function Signup() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user,SetUser]=useState({
    name:"",
    email:"",
    password:"",
    otp:""
});
  const navigate = useNavigate(); 

  const handleChange = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const {name,value}=e.target
      SetUser ({
          ...user,
          [name]:value
      })
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("Loading");
    console.log(user);
    if(user.name !== "" && user.email !== "" && user.password !== "") {
        if(!otpSent) {
            axios.post(BASE_URL + "/makemail",user).then((res)=>{
                if(res.data==="OTP SENT Succesfully") {
                    setOtpSent(true);
                    setErrorMessage("");
                }
                else {
                    setErrorMessage(res.data);
                }
            })
        }
        else {
            if(user.otp!=="") {
                axios.post(BASE_URL + "/signup",user).then((res)=>{
                    if(res.data==="SuccessFully Registered") {
                        setErrorMessage(res.data + " Please Login")
                        setOtpVerified(true);
                        setOtpSent(false);
                        SetUser({
                            name:"",
                            email:"",
                            password:"",
                            otp:""
                        })
                    }
                    else{
                        setErrorMessage(res.data);
                    }
                })
            }
            else {
                setErrorMessage("Invalid OTP");
            }
        }
    }
    else {
        setErrorMessage("Invalid Details");
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Card className='p-4 shadow-lg' style={{ width: '400px' }}>
        <h3 className='text-center text-danger mb-4'>Please Register Here</h3>
        <h5 className='text-center mb-3'>Please fill in the details below:</h5>

        {errorMessage && errorMessage!=="Loading" && errorMessage !=="SuccessFully Registered Please Login" && <Alert className='text-center' variant='danger'>{errorMessage}</Alert>}
        {errorMessage && (errorMessage==="Loading" || errorMessage==="SuccessFully Registered Please Login") && <Alert className='text-center' variant='success'>{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              name='name'
              value={user.name}
              onChange={handleChange}
              required
              disabled={otpSent && !otpVerified} // Disable after OTP is sent
            />
          </Form.Group>

          <Form.Group controlId='formEmail' className='mt-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter your email'
              value={user.email}
              onChange={handleChange}
              required
              disabled={otpSent && !otpVerified} // Disable after OTP is sent
            />
          </Form.Group>

          <Form.Group controlId='formPassword' className='mt-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Enter your password'
              value={user.password}
              onChange={handleChange}
              required
              disabled={otpSent && !otpVerified} // Disable after OTP is sent
            />
          </Form.Group>

          {otpSent && !otpVerified && (
            <Form.Group controlId='formOtp' className='mt-3'>
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type='text'
                name='otp'
                placeholder='Enter OTP sent to your email'
                value={user.otp}
                minLength={6}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          <Button variant='primary' type='submit' className='mt-4 w-100'>
            {otpSent ? 'Verify OTP' : 'Send OTP'}
          </Button>

          <div className='text-center mt-3'>
            <p>
              Already registered?{' '}
              <Button variant='link' onClick={() => navigate("/")}>
                Login here
              </Button>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Signup;
