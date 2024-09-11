import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// custom component
import LoggedIn from "./components/wrappers/LoggedIn";

// Admin wrappers
//import VerifyAdmin from "./components/wrappers/VerifyAdmin";
import VerifyTribalAdmin from "./components/wrappers/VerifyTribalAdmin";
import VerifySnackbarAdmin from "./components/wrappers/VerifySnackbarAdmin";
import VerifyGeneralStoreAdmin from "./components/wrappers/VerifyGeneralStoreAdmin";
import VerifyEmergencyAdmin from "./components/wrappers/VerifyEmergencyAdmin";

import LogoutButton from "./components/header/LogoutButton";
import LoginButton from "./components/header/LoginButton";
import HomeButton from "./components/header/HomeButton";
import TransitionAlert from "./components/alerts/TransitionAlert";

// context
import { LoginContext } from "./context/loginContext";
import { SetWebTableDataContext } from "./context/webTableContext";

// data
import { keys } from "./data/keys";

// api
import { getAllItemsAPI } from "./services/APIs/getAllItemsAPI";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import CreateNewPassword from "./pages/CreateNewPassword";
import Calendar from "./pages/Calendar";
import EmergencyNoticePage from "./pages/Emergency";
import TribalNotices from "./pages/TribalNotices";
import Health from "./pages/Health";
import Snackbar from "./pages/Snackbar";
import GeneralStore from "./pages/GeneralStore";

// no login pages
import HolidayGreetingCards from "./pages/Holiday/HolidayGreetingCards";
import WellnessEventSignup from "./pages/NotLoggedIn/WellnessEventSignup";

// admin pages
import ManageTribalNotices from "./pages/admin/ManageTribalNotices";
import ManageEmergencyNotices from "./pages/admin/ManageEmergencyNotices";
import ManageSnackbar from "./pages/admin/ManageSnackbar";
import ManageGeneralStore from "./pages/admin/ManageGeneralStore";

// styles
import "./assets/styles/css/App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// material-ui
import { Container } from "@mui/material";

// Alerts references, do not delete:
// Example of closable alert: <TransitionAlert severity="info" text={'This is an info alert — check it out!'}/>
// severity attribute options: 'error' | 'warning' | 'info' | 'success'

const App: React.FC = () => {
  const setWebTableData = useContext(SetWebTableDataContext);

  useEffect(() => {
    const getWebData = async () => {
      const response = await getAllItemsAPI(keys.webTableName);
      setWebTableData(await response);
    };
    getWebData();
  }, []);

  const isLoggedIn = useContext(LoginContext);

  const location = useLocation();
  // Access the pathname from the location object
  const currentPage = location.pathname;

  const renderTopNavButtons = () => {
    if (currentPage === "/login") {
      return "";
    }
    if (!isLoggedIn) {
      return (
        <Container maxWidth="lg">
          <div
            style={{
              position: "relative",
              marginTop: "20px",
              padding: "55px 0 10px 0",
            }}
          >
            <LoginButton />
          </div>
        </Container>
      );
    }
    if (isLoggedIn) {
      return (
        <Container maxWidth="lg">
          <div
            style={{
              position: "relative",
              marginTop: "20px",
              padding: "10px 0",
            }}
          >
            <HomeButton />
            <LogoutButton />
          </div>
          <div style={{ margin: "50px 0" }}>
            <h1>miccosukee.community</h1>
            <TransitionAlert
              severity="info"
              text={"This is an info alert — check it out!"}
            />
          </div>
        </Container>
      );
    }
  };

  return (
    <div>
      {renderTopNavButtons()}
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
          path="/admin/tribal-notices"
          element={
            <LoggedIn>
              <VerifyTribalAdmin>
                <ManageTribalNotices />
              </VerifyTribalAdmin>
            </LoggedIn>
          }
        />
        <Route
          path="/admin/emergency-notices"
          element={
            <LoggedIn>
              <VerifyEmergencyAdmin>
                <ManageEmergencyNotices />
              </VerifyEmergencyAdmin>
            </LoggedIn>
          }
        />
        <Route
          path="/admin/managesnackbar"
          element={
            <LoggedIn>
              <VerifySnackbarAdmin>
                <ManageSnackbar />
              </VerifySnackbarAdmin>
            </LoggedIn>
          }
        />
        <Route
          path="/admin/managegeneralstore"
          element={
            <LoggedIn>
              <VerifyGeneralStoreAdmin>
                <ManageGeneralStore />
              </VerifyGeneralStoreAdmin>
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
        <Route path="/emergency" element={<EmergencyNoticePage />} />
        <Route path="/snackbar" element={<Snackbar />} />
        <Route path="/generalstore" element={<GeneralStore />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
};

export default App;
