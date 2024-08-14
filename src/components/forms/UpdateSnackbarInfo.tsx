/*
import React, { useState, useContext } from 'react';
import { useSnackbar } from '../../lib/notistack';
import { FormControl, FormLabel, TextField, Button, CircularProgress, MenuItem, Select, InputLabel } from '@mui/material';
import { FormPaper } from '../../assets/styles/styledComponents/formPaper';

import { keys } from '../../data/keys';
import { updateRecordObjType } from '../../customTypes';
import { updateRecordAPI } from '../../services/APIs/updateRecordAPI';

// context
import { UserContext } from '../../context/userContext';
import { SnackbarContext } from '../../context/snackbar';


// Add prop type
type UpdateSnackbarInfoProps = {
  rerenderSnackbarInfo: () => void;
};

const UpdateSnackbarInfo: React.FC<UpdateSnackbarInfoProps> = ({
  rerenderSnackbarInfo,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  let [error, setError] = useState<string | null>(null);
  const snackbarInfo = useContext(SnackbarContext);

  const [formData, setFormData] = useState({
    snackbarSpecial: '',
    snackbarSpecialPrice: '',
    restaurantStatus: 'open', // Default value
  });
  const [loading, setLoading] = useState(false);

  console.log("Form data: ", formData);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearFormData = () => {
    setFormData({
      snackbarSpecial: '',
      snackbarSpecialPrice: '',
      restaurantStatus: '',
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    let updateSnackbarStatus = false;
    let updateSnackbarSpecial = false;
    let updateSnackbarSpecialPrice = false;

    // If I need to update the item, update, otherwise do not update.
    if(formData.restaurantStatus === snackbarInfo.snackbarStatus) {
      updateSnackbarStatus = false;
    } else {
      updateSnackbarStatus = true;
    }
    if(formData.snackbarSpecial === snackbarInfo.snackbarSpecial) {
      updateSnackbarSpecial = false;
    } else {
      updateSnackbarSpecial = true;
    }
    if(formData.snackbarSpecialPrice === snackbarInfo.snackbarSpecialPrice) {
      updateSnackbarSpecialPrice = false;
    } else {
      updateSnackbarSpecialPrice = true;
    }

    const restaurantStatusObj: updateRecordObjType = {
      table: keys.webTableName,
      id: 'snackbar',
      attributeObj: {
        name: 'snackbarStatus',
        value: formData.restaurantStatus,
      },
    };

    const snackbarSpecialObj: updateRecordObjType = {
      table: keys.webTableName,
      id: 'snackbar',
      attributeObj: {
        name: 'snackbarSpecial',
        value: formData.snackbarSpecial,
      },
    };

    const snackbarSpecialPriceObj: updateRecordObjType = {
      table: keys.webTableName,
      id: 'snackbar',
      attributeObj: {
        name: 'snackbarSpecialPrice',
        value: formData.snackbarSpecialPrice,
      },
    };

    const updateStatusResponse = await updateRecordAPI(restaurantStatusObj);
    const updateSpecialResponse = await updateRecordAPI(snackbarSpecialObj);
    const updatePriceResponse = await updateRecordAPI(snackbarSpecialPriceObj);

    if (updateStatusResponse === 'Item updated') {
      enqueueSnackbar('Snackbar Info Updated.', {
        variant: 'success',
      });
      clearFormData();
      rerenderSnackbarInfo();
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
            Update Snackbar Info
          </FormLabel>
          <FormControl fullWidth margin="normal">
            <InputLabel id="restaurant-status-label">Restaurant Status</InputLabel>
            <Select
              label="Snackbar Status *"
              name="restaurantStatus"
              value={formData.restaurantStatus}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Snackbar Special Details"
            name="snackbarSpecial"
            value={formData.snackbarSpecial}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Snackbar Special Price"
            name="snackbarSpecialPrice"
            value={formData.snackbarSpecialPrice}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          
          <div style={{ position: 'relative' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              <span style={loading ? { visibility: 'hidden' } : {}}>
                Update Info
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

export default UpdateSnackbarInfo;
*/




import React, { useState, useContext } from 'react';
import { useSnackbar } from '../../lib/notistack';
import { FormControl, FormLabel, TextField, Button, CircularProgress, MenuItem, Select, InputLabel } from '@mui/material';
import { FormPaper } from '../../assets/styles/styledComponents/formPaper';

import { keys } from '../../data/keys';
import { updateRecordObjType } from '../../customTypes';
import { updateRecordAPI } from '../../services/APIs/updateRecordAPI';

// context
import { UserContext } from '../../context/userContext';
import { SnackbarContext } from '../../context/snackbar';


// Add prop type
type UpdateSnackbarInfoProps = {
  rerenderSnackbarInfo: () => void;
};

const UpdateSnackbarInfo: React.FC<UpdateSnackbarInfoProps> = ({
  rerenderSnackbarInfo,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  let [error, setError] = useState<string | null>(null);
  const snackbarInfo = useContext(SnackbarContext);

  const [formData, setFormData] = useState({
    snackbarSpecial: '',
    snackbarSpecialPrice: '',
    restaurantStatus: 'open', // Default value
  });
  const [loading, setLoading] = useState(false);

  console.log("Form data: ", formData);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearFormData = () => {
    setFormData({
      snackbarSpecial: '',
      snackbarSpecialPrice: '',
      restaurantStatus: '',
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      // Check and update snackbarStatus if it's different
      if (formData.restaurantStatus !== snackbarInfo.snackbarStatus || formData.restaurantStatus === '') {
        const restaurantStatusObj: updateRecordObjType = {
          table: keys.webTableName,
          id: 'snackbar',
          attributeObj: {
            name: 'snackbarStatus',
            value: formData.restaurantStatus,
          },
        };
        const statusResponse = await updateRecordAPI(restaurantStatusObj);
        if (statusResponse !== 'Item updated') {
          throw new Error('Failed to update snackbarStatus');
        }
      }
  
      // Check and update snackbarSpecial if it's different
      if (formData.snackbarSpecial !== snackbarInfo.snackbarSpecial || formData.snackbarSpecial === '') {
        const snackbarSpecialObj: updateRecordObjType = {
          table: keys.webTableName,
          id: 'snackbar',
          attributeObj: {
            name: 'snackbarSpecial',
            value: formData.snackbarSpecial,
          },
        };
        const specialResponse = await updateRecordAPI(snackbarSpecialObj);
        if (specialResponse !== 'Item updated') {
          throw new Error('Failed to update snackbarSpecial');
        }
      }
  
      // Check and update snackbarSpecialPrice if it's different
      if (formData.snackbarSpecialPrice !== snackbarInfo.snackbarSpecialPrice || formData.snackbarSpecialPrice === '') {
        const snackbarSpecialPriceObj: updateRecordObjType = {
          table: keys.webTableName,
          id: 'snackbar',
          attributeObj: {
            name: 'snackbarSpecialPrice',
            value: formData.snackbarSpecialPrice,
          },
        };
        const priceResponse = await updateRecordAPI(snackbarSpecialPriceObj);
        if (priceResponse !== 'Item updated') {
          throw new Error('Failed to update snackbarSpecialPrice');
        }
      }
  
      // If all updates were successful
      enqueueSnackbar('Snackbar Info Updated.', {
        variant: 'success',
      });
  
      clearFormData();
      rerenderSnackbarInfo();
    } catch (error) {
      setError('Server error');
      enqueueSnackbar('Server error, please try again.', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <FormPaper style={{ marginLeft: '0' }}>
        <FormControl fullWidth>
          <FormLabel component="h1" sx={{ fontSize: '22px' }}>
            Update Snackbar Info
          </FormLabel>
          <FormControl fullWidth margin="normal">
            <InputLabel id="restaurant-status-label">Restaurant Status</InputLabel>
            <Select
              label="Snackbar Status *"
              name="restaurantStatus"
              value={formData.restaurantStatus}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Snackbar Special Details"
            name="snackbarSpecial"
            value={formData.snackbarSpecial}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Snackbar Special Price"
            name="snackbarSpecialPrice"
            value={formData.snackbarSpecialPrice}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          
          <div style={{ position: 'relative' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              <span style={loading ? { visibility: 'hidden' } : {}}>
                Update Info
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

export default UpdateSnackbarInfo;