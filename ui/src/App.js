import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/gallery" component={GalleryPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/users" component={UsersPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
