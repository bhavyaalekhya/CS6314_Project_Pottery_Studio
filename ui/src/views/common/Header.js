import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Header.css'; // Import your CSS file for styling

function Header() {
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
        <Link to="/admin" className="nav-link">
          Admin
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/signup" className="nav-link">
          Signup
        </Link>
      </nav>
    </header>
  );
}

export default Header;
