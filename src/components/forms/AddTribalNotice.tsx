import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../lib/notistack";

// material-ui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormPaper } from "../../assets/styles/styledComponents/formPaper";
import { AddTribalNoticeObjType } from "../../customTypes";

// keys
import { keys } from "../../data/keys";

// api
import { addTribalNoticeAPI } from "../../services/APIs/addTribalNoticeAPI";
import { getAllItemsAPI } from "../../services/APIs/getAllItemsAPI";

// context
import { UserContext } from "../../context/userContext";
import { SetWebTableDataContext } from "../../context/webTableContext";

const AddTribalNotice: React.FC = () => {
  const user = useContext(UserContext);
  let [error, setError] = useState<string | null>(null);
  const setWebTableData = useContext(SetWebTableDataContext);

  // variant could be success, error, warning, info, or default
  // example use) enqueueSnackbar("Form submitted successfully!", { variant: "success" });
  const { enqueueSnackbar } = useSnackbar();

  type formData = {
    tribalId: string;
    tribalNotice: string;
  };
  const [formData, setFormData] = useState<formData>({
    tribalId: "",
    tribalNotice: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  type eventType = React.ChangeEvent<HTMLInputElement>;
  const handleChange = (event: eventType) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const today = new Date();
  const AddTribalNoticeObj: AddTribalNoticeObjType = {
    tableName: keys.webTableName,
    item: {
      id: today.toISOString(),
      tribalNotice: formData.tribalNotice,
      name: `${user.firstName} ${user.lastName}`,
      userId: user.id,
      dateAdded: today,
    },
  };

  // function that clears form data on submit
  const clearFormData = () => {
    setFormData({
      tribalId: "",
      tribalNotice: "",
    });
  };

  // Keep context up to date and rerenders when updated.
  const refreshWebTableDataContext = async () => {
    const response = await getAllItemsAPI(keys.webTableName);
    setWebTableData(response);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    // Perform form submission logic or validation here
    const response = await addTribalNoticeAPI(AddTribalNoticeObj);

    if (response === "Item added") {
      enqueueSnackbar("Notice successfully created!", {
        variant: "success",
      });
      clearFormData();
      await refreshWebTableDataContext();
    } else {
      setError("Server error");
      enqueueSnackbar("Server error, please try again.", {
        variant: "error",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormPaper style={{ marginLeft: "0" }}>
        <FormControl fullWidth>
          <FormLabel component="h1" sx={{ fontSize: "22px" }}>
            Create Tribal Notice
          </FormLabel>
          <TextField
            required
            label="Name"
            name="name"
            value={`${user.firstName} ${user.lastName}`}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            required
            label="Tribal Notice"
            name="tribalNotice"
            value={formData.tribalNotice}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <div style={{ position: "relative" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading === true}
              sx={{ mt: 3, mb: 2 }}
            >
              <span style={loading ? { visibility: "hidden" } : {}}>
                Create Notice
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

export default AddTribalNotice;
