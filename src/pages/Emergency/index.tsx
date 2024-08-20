import React, { useState } from "react";

// custom component
import EmergencyNoticesList from "../../components/lists/EmergencyNotices";

//material-ui
import { Container } from "@mui/material";

const ManageEmergencyNoticePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <div style={{ marginTop: "70px" }}>
        <h3 style={{ marginBottom: "-20px" }}>Emergency Notices:</h3>
        <EmergencyNoticesList />
      </div>
    </Container>
  );
};

export default ManageEmergencyNoticePage;
