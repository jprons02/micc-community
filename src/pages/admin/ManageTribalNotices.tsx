import React, { useState, useContext, useEffect } from "react";
import AddTribalNotice from "../../components/forms/AddTribalNotice";

// custom component
import TribalNoticesList from "../../components/lists/TribalNotices";

//material-ui
import { Container } from "@mui/material";

const ManageTribalNotices: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <div>
        <AddTribalNotice />
      </div>
      <div style={{ marginTop: "70px" }}>
        <h3 style={{ marginBottom: "-20px" }}>Tribal Notices:</h3>
        <TribalNoticesList />
      </div>
    </Container>
  );
};

export default ManageTribalNotices;
