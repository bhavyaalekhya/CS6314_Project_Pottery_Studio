import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import '../../css/Login.css';

function LoginPage() {
const [formData, setFormData] = useState({
  username:'',
  password:''
})

const { currentUser, logout } = useContext(AuthContext);

const [err,setErr] = useState(null);
const navigate = useNavigate();
const { login } = useContext(AuthContext);


const handleChange = (e) =>{
  setFormData({...formData,[e.target.name]:e.target.value,});
}

const handleSubmit = async (e) =>{
  e.preventDefault();
  try{
    await login(formData);
    navigate("/");
    
  }catch(err){
    console.log(err);
  }
}

  return (
      <div className="login-container">
      <form onSubmit= {handleSubmit} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <input
              className="cust-form-control"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mt-3">
            <input
              className="cust-form-control"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="login-button">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            No Account? <a href="/signup">Create one!</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
