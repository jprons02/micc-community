import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import CreateNewPassword from './pages/CreateNewPassword';
import Calendar from './pages/Calendar';

// assets
import './assets/styles/css/App.css';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/resetpassword/:userId/:lostPasswordCode"
            element={<CreateNewPassword />}
          />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
