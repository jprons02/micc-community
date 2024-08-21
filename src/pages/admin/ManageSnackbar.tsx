import React, { useContext } from "react";

import RestaurantStatusForm from "../../components/forms/Snackbar/RestaurantStatus";
import SnackbarSpecialForm from "../../components/forms/Snackbar/SnackbarSpecialDetails";
import SnackbarSpecialPriceForm from "../../components/forms/Snackbar/SnackbarSpecialPrice";

// context
import { WebTableDataContext } from "../../context/webTableContext";

//material-ui
import { Container } from "@mui/material";

const ManageSnackbar: React.FC = () => {
  const webTableData = useContext(WebTableDataContext);
  const snackbarInfo = () => {
    return (
      webTableData.find((record: any) => record.id === "snackbar") ||
      "Loading..."
    );
  };

  return (
    <Container maxWidth="lg">
      <div>
        <div style={{ marginBottom: "50px" }}>
          <RestaurantStatusForm />
        </div>
        <div style={{ marginBottom: "50px" }}>
          <SnackbarSpecialForm />
        </div>
        <div>
          <SnackbarSpecialPriceForm />
        </div>
      </div>
      <div style={{ marginTop: "70px", paddingBottom: "40px" }}>
        <h3>Current Snackbar Info:</h3>
        <p>Snackbar Status: {snackbarInfo().snackbarStatus}</p>
        <p>Snackbar Special Details: {snackbarInfo().snackbarSpecial}</p>
        <p>Snackbar Special Price: ${snackbarInfo().snackbarSpecialPrice}</p>
      </div>
    </Container>
  );
};

export default ManageSnackbar;
