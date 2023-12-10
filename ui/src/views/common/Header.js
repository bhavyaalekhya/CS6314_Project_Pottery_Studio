import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";
import { Link } from 'react-router-dom';
import '../../css/Header.css'; // Import your CSS file for styling

function Header() {
  const { currentUser, logout } = useContext(AuthContext);
  /*console.log("currentUser:", currentUser)*/

  return (
    <header className="header-container">
      <div className="logo-container">
        <Link to="/" className="logo">
          Pottery Studio
        </Link>
      </div>
      <nav className="nav-links">
      {currentUser && (
          <div className='userInfo_container'><span style={{ fontSize: '25px' }} className="userInfo"> Hello {currentUser?.username}!!</span></div>
        )}

          {currentUser ? (
            <div className='userInfo_container'>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/contact" className="nav-link">
                Contact Us
              </Link>

              {currentUser && currentUser.role != 'admin' && (
                <Link to='/users' className="nav-link">
                  Profile
                </Link>
            )}

            {currentUser && currentUser.role != 'admin' && (
                <Link to='/cart' className="nav-link">
                  Cart
                </Link>
            )}

            {/* Render "Admin" link only if the user is an admin */}
            {currentUser && currentUser.role == 'admin' && (
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            )}
            <Link to="/" className="nav-link" onClick={()=>{console.log(logout())}}>
                Logout
              </Link>
            {/*<button className="logoutbtn nav-link" onClick={()=>{console.log(logout())}}>Logout</button>*/}
            </div>
          ) : (
            <div className='userInfo_container'>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/contact" className="nav-link">
                Contact Us
              </Link>
              <Link className="nav-link" to="/login">
              Login
            </Link> {' '}
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