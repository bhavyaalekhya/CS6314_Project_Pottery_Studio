/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from MongoDB
    axios.get('/api/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Admin Page</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;*/
