# Healthcare Management Application

This project is a healthcare management application designed to manage patient data effectively and facilitate prior authorization requests. Built with **React.js**, **Bootstrap**, and **CSS**, this application allows healthcare professionals to authenticate, manage patients, and submit authorization requests seamlessly.

## Deployed Application

You can access the live application using the following link: [Patients Dashboard](https://patientsdashboardsite.netlify.app/)

## Front-End Structure

### Key Components and Files

1. **login.js**: 
   - Manages user authentication and allows users to log into their accounts.
   - Implements form validation and handles submission with API calls.

2. **signup.js**: 
   - Allows new users to register with email OTP verification for enhanced security.

3. **Dashboard.js**: 
   - Displays a list of patients, providing options to view individual patient details and add new patients.

4. **addPatient.js**: 
   - A form for adding new patients, collecting necessary information such as name, age, condition, and treatment plan.

5. **priorAuthorization.js**: 
   - Enables healthcare professionals to submit prior authorization requests for patients, including fields for treatment details and insurance information.

6. **helper.js**: 
   - Contains the backend API endpoint, simplifying the process of making API calls.

7. **patientDetails.js**: 
   - Displays detailed information about a specific patient when clicked from the dashboard.

## Features

- **User Authentication**: Secure login and signup processes with email OTP verification.
- **Patient Management**: Ability to add, view, and manage patient details efficiently.
- **Prior Authorization**: Submit authorization requests with relevant medical information.
- **Responsive Design**: Bootstrap ensures a responsive user interface for various devices.
- **Dashboard Overview**: A clear and organized dashboard displaying all patient information at a glance.
- **Error Handling**: Handles errors gracefully during API requests, providing user-friendly feedback.
- **Detailed Patient Information**: Clickable patient entries that lead to detailed views of patient data.

Login Page :
![image](https://github.com/user-attachments/assets/06294997-5918-4598-991c-281717e76e05)

SignUp Page :
![image](https://github.com/user-attachments/assets/6d5551f7-306b-4526-9edb-572de4256572)

DashBoard : 
![image](https://github.com/user-attachments/assets/d8892c57-0d5a-400e-8388-e2c632e4f042)

Patients Details :
![Screenshot (145)](https://github.com/user-attachments/assets/49c4fffe-8d2f-492c-9e8b-ea50ab84dfd4)

Add Patient :
![image](https://github.com/user-attachments/assets/ec57aafe-0ec2-46fa-a71c-aff40bf14b88)

Add Prior Authorization :
![image](https://github.com/user-attachments/assets/04bc869f-0e12-4052-a1b4-4c38231e097b)







## Dependencies

To set up the project, ensure you have the following dependencies in your **package.json**:

```json
"dependencies": {
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "axios": "^1.7.7",
  "bootstrap": "^5.3.3",
  "react": "^18.3.1",
  "react-bootstrap": "^2.10.5",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.27.0",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"
}
