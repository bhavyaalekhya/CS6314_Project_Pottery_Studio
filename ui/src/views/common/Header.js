import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";
import { Link } from 'react-router-dom';
import '../../css/Header.css'; // Import your CSS file for styling

function Header() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <header className="header-container">
      <div className="logo-container">
        <Link to="/" className="logo">
          Pottery Studio
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/gallery" className="nav-link">
          Gallery
        </Link>
        <Link to="/users" className="nav-link">
          Profile
        </Link>
        <Link to="/admin" className="nav-link">
          Admin
        </Link>
        
          {currentUser ? (
            <div className='userInfo_container'><span className="userInfo"> Hello {currentUser?.username}!!</span>
            <button className="logoutbtn nav-link" onClick={()=>{console.log(logout())}}>Logout</button></div>
          ) : (
            <div className='userInfo_container'><Link className="link" to="/login">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
            Signup
          </Link>
          </div>
          )}
           

        {/* <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/signup" className="nav-link">
          Signup
        </Link> */}
      </nav>
    </header>
  );
}

export default Header;
