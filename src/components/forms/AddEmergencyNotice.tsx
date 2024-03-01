import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../lib/notistack';

// material-ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormPaper } from '../../assets/styles/styledComponents/formPaper';

import { keys } from '../../data/keys';
import { AddEmergencyNoticeObjType } from '../../customTypes';
import { addEmergencyNoticeAPI } from '../../services/APIs/addEmergencyNoticeAPI';

// context
import { UserContext } from '../../context/userContext';

// Add prop type
type AddEmergencyNoticeProps = {
  rerenderNotices: () => void;
};

const AddEmergencyNotice: React.FC<AddEmergencyNoticeProps> = ({
  rerenderNotices,
}) => {
  let navigate = useNavigate();
  const user = useContext(UserContext);
  let [error, setError] = useState<string | null>(null);

  // variant could be success, error, warning, info, or default
  // example use) enqueueSnackbar("Form submitted successfully!", { variant: "success" });
  const { enqueueSnackbar } = useSnackbar();

  type formData = {
    tribalId: string;
    emergencyNoticeTitle: string;
    emergencyNoticeDetails: string;
    resourceLinks: Array<string>;
  };
  const [formData, setFormData] = useState<formData>({
    tribalId: '',
    emergencyNoticeTitle: '',
    emergencyNoticeDetails: '',
    resourceLinks: [''],
  });

  const [loading, setLoading] = useState<boolean>(false);

  type eventType = React.ChangeEvent<HTMLInputElement>;
  const handleChange = (event: eventType) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes for array fields
  const handleArrayChange = (index: number, value: string) => {
    const updatedLinks = [...formData.resourceLinks];
    updatedLinks[index] = value;
    setFormData({ ...formData, resourceLinks: updatedLinks });
  };

  const today = new Date();

  const emergencyNotice = {
    title: formData.emergencyNoticeTitle,
    details: formData.emergencyNoticeDetails,
    resourceLinks: formData.resourceLinks,
  };

  const AddEmergencyNoticeObj: AddEmergencyNoticeObjType = {
    tableName: keys.webTableName,
    item: {
      id: today.toISOString(),
      emergencyNotice: emergencyNotice,
      name: `${user.firstName} ${user.lastName}`,
      userId: user.id,
      dateAdded: today,
    },
  };

  // function that clears form data on submit
  const clearFormData = () => {
    setFormData({
      tribalId: '',
      emergencyNoticeTitle: '',
      emergencyNoticeDetails: '',
      resourceLinks: [],
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    // Perform form submission logic or validation here
    const response = await addEmergencyNoticeAPI(AddEmergencyNoticeObj);

    if (response === 'Item added') {
      enqueueSnackbar('Notice successfully created!', {
        variant: 'success',
      });
      clearFormData();
      rerenderNotices();
    } else {
      setError('Server error');
      enqueueSnackbar('Server error, please try again.', {
        variant: 'error',
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormPaper style={{ marginLeft: '0' }}>
        <FormControl fullWidth>
          <FormLabel component="h1" sx={{ fontSize: '22px' }}>
            Create Emergency Notice
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
            label="Emergency Notice Title"
            name="emergencyNoticeTitle"
            value={formData.emergencyNoticeTitle}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Emergency Notice Details"
            name="emergencyNoticeDetails"
            value={formData.emergencyNoticeDetails}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Resource Link 1"
            name="resourceLinks"
            value={formData.resourceLinks[0] || ''}
            onChange={(e) => handleArrayChange(0, e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Resource Link 2"
            name="resourceLinks"
            value={formData.resourceLinks[1] || ''}
            onChange={(e) => handleArrayChange(1, e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Resource Link 3"
            name="resourceLinks"
            value={formData.resourceLinks[2] || ''}
            onChange={(e) => handleArrayChange(2, e.target.value)}
            fullWidth
            margin="normal"
          />
          <div style={{ position: 'relative' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading === true}
              sx={{ mt: 3, mb: 2 }}
            >
              <span style={loading ? { visibility: 'hidden' } : {}}>
                Create Notice
              </span>
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-8px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </div>
        </FormControl>
      </FormPaper>
    </form>
  );
};

export default AddEmergencyNotice;
