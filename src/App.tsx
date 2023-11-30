import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

// custom component
import LoggedIn from './components/wrappers/LoggedIn';
import VerifyAdmin from './components/wrappers/VerifyAdmin';
import LogoutButton from './components/header/LogoutButton';
import HomeButton from './components/header/HomeButton';
import TransitionAlert from './components/alerts/TransitionAlert';

// context
import { SetLoginContext } from './context/loginContext';
import { LoginContext } from './context/loginContext';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import CreateNewPassword from './pages/CreateNewPassword';
import Calendar from './pages/Calendar';
import TribalNotices from './pages/TribalNotices';
import Health from './pages/Health';

// no login pages
import HolidayGreetingCards from './pages/Holiday/HolidayGreetingCards';
import WellnessEventSignup from './pages/NotLoggedIn/WellnessEventSignup';

// admin pages
import ManageTribalNotices from './pages/Admin/ManageTribalNotices';

// styles
import './assets/styles/css/App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// material-ui
import Alert from '@mui/material/Alert';
import { Container } from '@mui/material';

// Alerts references, do not delete:
// Example of closable alert: <TransitionAlert severity="info" text={'This is an info alert — check it out!'}/>
// severity attribute options: 'error' | 'warning' | 'info' | 'success'

const App: React.FC = () => {
  const isLoggedIn = useContext(LoginContext);

  return (
    <div>
      {!isLoggedIn ? null : (
        <Container maxWidth="lg">
          <div
            style={{
              position: 'relative',
              marginTop: '20px',
              padding: '10px 0',
            }}
          >
            <HomeButton />
            <LogoutButton />
          </div>
          <div style={{ margin: '50px 0' }}>
            <h1>miccosukee.community</h1>
            <TransitionAlert
              severity="info"
              text={'This is an info alert — check it out!'}
            />
          </div>
        </Container>
      )}
      <Routes>
        {/*NEED TO BE LOGGED IN*/}
        {/*NEED TO BE LOGGED IN*/}
        {/*NEED TO BE LOGGED IN*/}
        <Route
          path="/"
          element={
            <LoggedIn>
              <Home />
            </LoggedIn>
          }
        />
        <Route
          path="/home"
          element={
            <LoggedIn>
              <Home />
            </LoggedIn>
          }
        />
        <Route
          path="/tribal-notices"
          element={
            <LoggedIn>
              <TribalNotices />
            </LoggedIn>
          }
        />
        <Route
          path="/health"
          element={
            <LoggedIn>
              <Health />
            </LoggedIn>
          }
        />
        {/*NEED TO BE LOGGED ADMIN*/}
        <Route
          path="/admin/notices"
          element={
            <LoggedIn>
              <VerifyAdmin>
                <ManageTribalNotices />
              </VerifyAdmin>
            </LoggedIn>
          }
        />
        {/*NEED TO BE LOGGED ADMIN*/}
        <Route
          path="/calendar"
          element={
            <LoggedIn>
              <Calendar />
            </LoggedIn>
          }
        />
        {/*NEED TO BE LOGGED IN*/}
        {/*NEED TO BE LOGGED IN*/}
        {/*NEED TO BE LOGGED IN*/}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/resetpassword/:userId/:lostPasswordCode"
          element={<CreateNewPassword />}
        />
        <Route path="/holidaycards" element={<HolidayGreetingCards />} />
        <Route
          path="/wellness-event-signup"
          element={<WellnessEventSignup />}
        />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
};

export default App;
