import React, { useState, useEffect, useContext } from 'react';
import { useSnackbar } from '../../../lib/notistack';
import { UserContext } from '../../../context/userContext';
import { awsEmailServiceAPI } from '../../../services/APIs/awsEmailServiceAPI';

// context
import { LoginContext } from '../../../context/loginContext';

// material-ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormPaper } from '../../../assets/styles/styledComponents/formPaper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

// create props
interface WellnessEventRegisterFormProps {
  center: boolean;
}

const WellnessEventRegisterForm: React.FC<WellnessEventRegisterFormProps> = (
  props
) => {
  const isLoggedIn = useContext(LoginContext);
  const user = useContext(UserContext);

  const wellnessEvents = [
    {
      value: 'TESTING - Run/Walk, 10/17/23',
      label: 'TESTING - Run/Walk, 10/17/23',
    },
    {
      value: 'TESTING - 5K Run, 12/1/23',
      label: 'TESTING - 5K Run, 12/1/23',
    },
    {
      value: 'TESTING - 10K Run, 2/18/24',
      label: 'TESTING - 10K Run, 2/18/24',
    },
  ];

  const [formData, setFormData] = useState({
    firstName: isLoggedIn ? user.firstName : '',
    lastName: isLoggedIn ? user.lastName : '',
    email: isLoggedIn ? user.email : '',
    wellnessEvent: '',
  });

  // function that clears form data on submit
  const clearFormData = () => {
    setFormData({
      firstName: isLoggedIn ? user.firstName : '',
      lastName: isLoggedIn ? user.lastName : '',
      email: isLoggedIn ? user.email : '',
      wellnessEvent: '',
    });
  };

  useEffect(() => {
    clearFormData();
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  // variant could be success, error, warning, info, or default
  // example use) enqueueSnackbar("Form submitted successfully!", { variant: "success" });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const valuesObj = {
      email: ['jronselli@miccosukee.com'],
      subject: 'Wellness Event Registration Form Submission',
      message: `First Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail: ${formData.email}\nMessage: ${formData.wellnessEvent}`,
    };
    const response = await awsEmailServiceAPI(valuesObj);

    console.log('response: ', response);

    if (response === 'Email Sent') {
      enqueueSnackbar('Form submitted successfully!', { variant: 'success' });
      setLoading(false);
      clearFormData();
    } else {
      enqueueSnackbar('Something went wrong. Please try again.', {
        variant: 'error',
      });
      setLoading(false);
    }
  };

  const formPaperStyle = props.center
    ? { margin: 'auto' }
    : { marginLeft: '0' };

  return (
    <form onSubmit={handleSubmit}>
      <FormPaper style={formPaperStyle}>
        <FormControl fullWidth>
          <FormLabel component="h1" sx={{ fontSize: '22px' }}>
            Wellness Event Registration
          </FormLabel>
          <TextField
            onChange={handleChange}
            required
            disabled={isLoggedIn ? true : false}
            label="First name"
            name="firstName"
            value={formData.firstName}
            fullWidth
            margin="normal"
          />
          <TextField
            onChange={handleChange}
            required
            disabled={isLoggedIn ? true : false}
            label="Last name"
            name="lastName"
            value={formData.lastName}
            fullWidth
            margin="normal"
          />
          <TextField
            onChange={handleChange}
            required
            disabled={isLoggedIn ? true : false}
            label="Email"
            name="email"
            value={formData.email}
            fullWidth
            margin="normal"
          />
          <FormControl
            fullWidth
            variant="outlined"
            style={{ marginTop: '16px' }}
          >
            <InputLabel id="select-label">Select Field</InputLabel>
            <Select
              onChange={handleChange}
              labelId="select-label"
              label="Select Event"
              name="wellnessEvent"
              value={formData.wellnessEvent}
              required
            >
              {wellnessEvents.map((event) => {
                return (
                  <MenuItem key={event.value} value={event.value}>
                    {event.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <div style={{ position: 'relative' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading === true}
              sx={{ mt: 3, mb: 2 }}
            >
              <span style={loading ? { visibility: 'hidden' } : {}}>
                SUBMIT
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

export default WellnessEventRegisterForm;

/*
<MenuItem value="option1">Option 1</MenuItem>
<MenuItem value="option2">Option 2</MenuItem>
<MenuItem value="option3">Option 3</MenuItem>
*/
