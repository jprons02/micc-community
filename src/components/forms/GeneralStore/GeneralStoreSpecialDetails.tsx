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

const GeneralStoreSpecialForm: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [generalStoreSpecial, setGeneralStoreSpecial] = useState("");
  const [loading, setLoading] = useState(false);
  const setWebTableData = useContext(SetWebTableDataContext);

  const clearForm = () => {
    setGeneralStoreSpecial("");
  };

  // Keep context up to date and rerenders when updated.
  const refreshWebTableDataContext = async () => {
    const response = await getAllItemsAPI(keys.webTableName);
    setWebTableData(response);
  };

  const handleChange = (event: any) => {
    setGeneralStoreSpecial(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Check if generalStoreSpecial is empty
    if (!generalStoreSpecial.trim()) {
      enqueueSnackbar("Restaurant status cannot be empty.", {
        variant: "error",
      });
      return;
    }

    setLoading(true);

    const generalStoreSpecialObj: updateRecordObjType = {
      table: keys.webTableName, // replace with your table name
      id: "generalStore",
      attributeObj: {
        name: "generalStoreSpecial",
        value: generalStoreSpecial,
      },
    };

    try {
      const response = await updateRecordAPI(generalStoreSpecialObj);
      if (response === "Item updated") {
        enqueueSnackbar("General Store Special Updated.", {
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
            Update General Store Special Details
          </FormLabel>
          <TextField
            label="General Store Special Details"
            value={generalStoreSpecial}
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

export default GeneralStoreSpecialForm;
