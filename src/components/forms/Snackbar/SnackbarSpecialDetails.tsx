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

const SnackbarSpecialForm: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [snackbarSpecial, setSnackbarSpecial] = useState("");
  const [loading, setLoading] = useState(false);
  const setWebTableData = useContext(SetWebTableDataContext);

  const clearForm = () => {
    setSnackbarSpecial("");
  };

  // Keep context up to date and rerenders when updated.
  const refreshWebTableDataContext = async () => {
    const response = await getAllItemsAPI(keys.webTableName);
    setWebTableData(response);
  };

  const handleChange = (event: any) => {
    setSnackbarSpecial(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Check if snackbarSpecial is empty
    if (!snackbarSpecial.trim()) {
      enqueueSnackbar("Restaurant status cannot be empty.", {
        variant: "error",
      });
      return;
    }

    setLoading(true);

    const snackbarSpecialObj: updateRecordObjType = {
      table: keys.webTableName, // replace with your table name
      id: "snackbar",
      attributeObj: {
        name: "snackbarSpecial",
        value: snackbarSpecial,
      },
    };

    try {
      const response = await updateRecordAPI(snackbarSpecialObj);
      if (response === "Item updated") {
        enqueueSnackbar("Snackbar Special Updated.", { variant: "success" });
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
            Update Snackbar Special Details
          </FormLabel>
          <TextField
            label="Snackbar Special Details"
            value={snackbarSpecial}
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
                Update Special
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

export default SnackbarSpecialForm;
