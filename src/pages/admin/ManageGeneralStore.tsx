import React, { useContext } from "react";

import GeneralStoreSpecialForm from "../../components/forms/GeneralStore/GeneralStoreSpecialDetails";
import GeneralStoreSpecialPriceForm from "../../components/forms/GeneralStore/GeneralStoreSpecialPrice";

// context
import { WebTableDataContext } from "../../context/webTableContext";

//material-ui
import { Container } from "@mui/material";

const ManageSnackbar: React.FC = () => {
  const webTableData = useContext(WebTableDataContext);
  const generalStoreInfo = () => {
    return (
      webTableData.find((record: any) => record.id === "generalStore") ||
      "Loading..."
    );
  };

  return (
    <Container maxWidth="lg">
      <div>
        <div style={{ marginBottom: "50px" }}>
          <GeneralStoreSpecialForm />
        </div>
        <div>
          <GeneralStoreSpecialPriceForm />
        </div>
      </div>
      <div style={{ marginTop: "70px", paddingBottom: "40px" }}>
        <h3>Current General Store Info:</h3>
        <p>
          Snackbar Special Details: {generalStoreInfo().generalStoreSpecial}
        </p>
        <p>
          Snackbar Special Price: ${generalStoreInfo().generalStoreSpecialPrice}
        </p>
      </div>
    </Container>
  );
};

export default ManageSnackbar;
