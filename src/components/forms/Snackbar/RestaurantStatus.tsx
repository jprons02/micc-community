import React, { useState, useContext } from "react";
import { useSnackbar } from "../../../lib/notistack";
import {
  FormControl,
  FormLabel,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
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

const RestaurantStatusForm: React.FC = (rerenderSnackbarInfo) => {
  const { enqueueSnackbar } = useSnackbar();
  const [restaurantStatus, setRestaurantStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const setWebTableData = useContext(SetWebTableDataContext);

  const clearForm = () => {
    setRestaurantStatus("");
  };

  // Keep context up to date and rerenders when updated.
  const refreshWebTableDataContext = async () => {
    const response = await getAllItemsAPI(keys.webTableName);
    setWebTableData(response);
  };

  const handleChange = (event: any) => {
    setRestaurantStatus(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Check if restaurantStatus is empty
    if (!restaurantStatus.trim()) {
      enqueueSnackbar("Restaurant status cannot be empty.", {
        variant: "error",
      });
      return;
    }

    setLoading(true);

    const restaurantStatusObj: updateRecordObjType = {
      table: keys.webTableName, // replace with your table name
      id: "snackbar",
      attributeObj: {
        name: "snackbarStatus",
        value: restaurantStatus,
      },
    };

    try {
      const response = await updateRecordAPI(restaurantStatusObj);
      if (response === "Item updated") {
        enqueueSnackbar("Restaurant Status Updated.", { variant: "success" });
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
            Update Restaurant Status
          </FormLabel>
          <FormControl fullWidth margin="normal">
            <InputLabel id="restaurant-status-label">
              Restaurant Status
            </InputLabel>
            <Select
              label="Snackbar Status *"
              value={restaurantStatus}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
          <div style={{ position: "relative" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              <span style={loading ? { visibility: "hidden" } : {}}>
                Update Status
              </span>
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-8px",
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

export default RestaurantStatusForm;
