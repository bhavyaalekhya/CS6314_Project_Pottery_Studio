import React, { useState, useEffect } from 'react';
import '../../css/UsersPage.css';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";

const UsersPage = () => {
  const API_URL = 'http://localhost:5000/api/users';
  const { currentUser } = useContext(AuthContext);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (currentUser) {
      const apiUrlForCurrentUser = `${API_URL}/${currentUser.username}`;
  
      fetch(apiUrlForCurrentUser)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          // Handle the error, show a message, or redirect the user
        });
    }
  }, [API_URL, currentUser]);

  const handleUpdateUser = async () => {
    try {
      // Create a new object with only the updated values
      const updatedValues = {};
      const _id = userData._id;

      // Example: Update 'name'
      const nameElement = document.getElementById('nameField');
      if (nameElement.innerText !== userData.name) {
        updatedValues.name = nameElement.innerText;
      }

      const addressElement = document.getElementById('addressField');
      if (addressElement.innerText !== userData.address) {
        updatedValues.address = addressElement.innerText;
      }

      const phoneElement = document.getElementById('phoneField');
      if (phoneElement.innerText !== userData.phoneNumber) {
        updatedValues.phoneNumber = phoneElement.innerText;
      }

      var sendVals = { "_id": _id, "updatedValues": updatedValues };
      // Send only the updated values to the server
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendVals),
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
    <div className='first'>
    <div className="container">
      <div className="users-container">
        <h1>User Profile</h1>
        <div className="user-info">
          <p>
            <strong id="name">Name:</strong>{' '}
            <span
              id="nameField"
              className="editable"
              contentEditable
            >
              {userData.name}
            </span>
          </p>
          <p>
            <strong id="email">Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Address:</strong>{' '}
            <span
              className="editable"
              id="addressField"
              contentEditable
            >
              {userData.address}
            </span>
          </p>
          <p>
            <strong>Phone Number:</strong>{' '}
            <span
              className="editable"
              id="phoneField"
              contentEditable
            >
              {userData.phoneNumber}
            </span>
          </p>
        </div>
      </div>
      <button className="save-button" onClick={handleUpdateUser}>Save</button>
    </div>
    </div>
  );
};

export default UsersPage;
