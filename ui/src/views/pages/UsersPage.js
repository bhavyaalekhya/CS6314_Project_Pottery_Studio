import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/UsersPage.css';

const UsersPage = () => {

  const API_URL = "http://localhost:5000/api/users";
  
  const [userData, setUserData] = useState([]); // Initialize and manage the items state

  useEffect(() => {
    // Fetch inventory data on component mount
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => {
        // Update the items state with the fetched data
        console.log(data);
        setUserData(data);
      });
  }, [API_URL]);

  const handleUpdateUser = async () => {
    try {
      const response = await fetch('http://localhost:5000//api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('User data updated successfully!');
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="users-container">
        <h1>User Profile</h1>
        <div className="user-info">
          <p>
            <strong id="name">Name:</strong>{userData.name}
            <span
              className="editable"
              contentEditable
              /*onBlur={(e) => handleUpdateUser('name', e.target.innerText)}*/
            >
            </span>
          </p>
          <p>
            <strong id="email">Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Address:</strong>{' '}
            <span
              className="editable"
              id="address"
              contentEditable
              /*onBlur={(e) => handleUpdateUser('address', e.target.innerText)}*/
            >
              {userData.address}
            </span>
          </p>
          <p>
            <strong>Phone Number:</strong>{' '}
            <span
              className="editable"
              id="phone"
              contentEditable
              /*onBlur={(e) => handleUpdateUser('phoneNumber', e.target.innerText)}*/
            >
              {userData.phoneNumber}
            </span>
          </p>
        </div>
      </div>
      <button onClick={handleUpdateUser}>Save</button>
    </div>
  );
};

export default UsersPage;