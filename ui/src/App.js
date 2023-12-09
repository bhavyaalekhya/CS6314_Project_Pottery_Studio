import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './views/common/Header';
import Footer from './views/common/Footer';
import HomePage from './views/pages/HomePage';
import GalleryPage from './views/pages/GalleryPage';
import AdminPage from './views/admin/AdminPage';
import LoginPage from './views/auth/LoginPage';
import SignupPage from './views/auth/SignupPage';
import UsersPage from './views/pages/UsersPage';
//Add your pages here

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/gallery" element={<GalleryPage/>} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/users" element={<UsersPage/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
