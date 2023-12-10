import React, { useState } from 'react';
import '../../css/Signup.css'; // Import your CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [err, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = () => {
    const { password } = formData;
    // Your password rules
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and symbols.');
      return false;
    } else {
      setPasswordError(null);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Validate password before submitting the form
      if (!validatePassword()) {
        return;
      }
      if(formData.confirmPassword!=formData.password){
        setPasswordError('Password did not match!');
        return;
      }
    try {
      (await axios.post("/register", formData)).data.data ? alert("User created!") :  alert("user already exists");
      navigate("/login");
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

{passwordError && <p className="error-message">{passwordError}</p>}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupPage;