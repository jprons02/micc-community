import React, { useState, useContext, useEffect } from "react";
import AddEmergencyNotice from "../../components/forms/AddEmergencyNotice";

// custom component
import EmergencyNoticesList from "../../components/lists/EmergencyNotices";

// context

//material-ui
import { Container } from "@mui/material";

const ManageEmergencyNotices: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <div>
        <AddEmergencyNotice />
      </div>
      <div style={{ marginTop: "70px" }}>
        <h3 style={{ marginBottom: "-20px" }}>Emergency Notices:</h3>
        <EmergencyNoticesList />
      </div>
    </Container>
  );
};

export default ManageEmergencyNotices;
