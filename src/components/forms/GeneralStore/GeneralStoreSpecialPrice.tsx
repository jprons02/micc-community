import React, { useState, useContext } from "react";
import { useSnackbar } from "../../../lib/notistack";
import {
  FormControl,
  FormLabel,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { FormPaper } from "../../../assets/styles/styledComponents/formPaper";
import { updateRecordObjType } from "../../../customTypes";

// api
import { updateRecordAPI } from "../../../services/APIs/updateRecordAPI";
import { getAllItemsAPI } from "../../../services/APIs/getAllItemsAPI";

// keys
import { keys } from "../../../data/keys";

// context
import { SetWebTableDataContext } from "../../../context/webTableContext";

const GeneralStoreSpecialPriceForm: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [generalStoreSpecialPrice, setGeneralStoreSpecialPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const setWebTableData = useContext(SetWebTableDataContext);

  const clearForm = () => {
    setGeneralStoreSpecialPrice("");
  };

  // Keep context up to date and rerenders when updated.
  const refreshWebTableDataContext = async () => {
    const response = await getAllItemsAPI(keys.webTableName);
    setWebTableData(response);
  };

  const handleChange = (event: any) => {
    setGeneralStoreSpecialPrice(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Check if generalStoreSpecialPrice is empty
    if (!generalStoreSpecialPrice.trim()) {
      enqueueSnackbar("Restaurant status cannot be empty.", {
        variant: "error",
      });
      return;
    }

    setLoading(true);

    const generalStoreSpecialPriceObj: updateRecordObjType = {
      table: keys.webTableName, // replace with your table name
      id: "generalStore",
      attributeObj: {
        name: "generalStoreSpecialPrice",
        value: generalStoreSpecialPrice,
      },
    };

    try {
      const response = await updateRecordAPI(generalStoreSpecialPriceObj);
      if (response === "Item updated") {
        enqueueSnackbar("General Store Special Price Updated.", {
          variant: "success",
        });
        await refreshWebTableDataContext();
        clearForm();
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      enqueueSnackbar("Server error, please try again.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormPaper style={{ marginLeft: "0" }}>
        <FormControl fullWidth>
          <FormLabel component="h1" sx={{ fontSize: "22px" }}>
            Update General Store Special Price
          </FormLabel>
          <TextField
            label="General Store Special Price"
            value={generalStoreSpecialPrice}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <div style={{ position: "relative" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              <span style={loading ? { visibility: "hidden" } : {}}>
                Update Price
              </span>
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </div>
        </FormControl>
      </FormPaper>
    </form>
  );
};

export default GeneralStoreSpecialPriceForm;
