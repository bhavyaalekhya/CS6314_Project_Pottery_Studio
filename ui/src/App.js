import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from "./context/authContext.js";
import Header from './views/common/Header';
import Footer from './views/common/Footer';
import HomePage from './views/pages/HomePage';
import ContactPage from './views/pages/ContactPage';
import AdminPage from './views/admin/AdminPage';
import LoginPage from './views/auth/LoginPage';
import SignupPage from './views/auth/SignupPage';
import UsersPage from './views/pages/UsersPage';
import ShopPage from './views/pages/ShopPage';
import ProductPage from './views/pages/ProductPage';
import CartPage from './views/pages/CartPage';
import CartProvider from './context/CartContext.js';
// Add your pages here

function App() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <Header />
        <CartProvider> {/* Wrap routes with CartProvider */}
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/cart' element={<CartPage />} />
          </Routes>
        </CartProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
