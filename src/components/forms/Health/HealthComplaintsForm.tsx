import React, { useState, useEffect, useContext } from 'react';
import { useSnackbar } from '../../../lib/notistack';
import { addUserFunction } from '../../../services/functions/addUserFunction';
import { useNavigate } from 'react-router-dom';
import useGoogleRecaptcha from '../../../hooks/useReCaptcha';
import { recaptchaTest } from '../../../services/functions/recaptchaTest';
import { UserContext } from '../../../context/userContext';
import { awsEmailServiceAPI } from '../../../services/APIs/awsEmailServiceAPI';

// material-ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormPaper } from '../../../assets/styles/styledComponents/formPaper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const HealthComplaintsForm: React.FC = () => {
  let navigate = useNavigate();
  const user = useContext(UserContext);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    message: '',
  });

  // function that clears form data on submit
  const clearFormData = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      message: '',
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
      subject: 'Health Complaints / Suggestions Form Submission',
      message: `First Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
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

  return (
    <form onSubmit={handleSubmit}>
      <FormPaper style={{ marginLeft: '0' }}>
        <FormControl fullWidth>
          <FormLabel component="h1" sx={{ fontSize: '22px' }}>
            Complaints / Suggestions
          </FormLabel>
          <TextField
            required
            disabled
            //label="First name"
            name="firstName"
            value={formData.firstName}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            disabled
            //label="First name"
            name="lastName"
            value={formData.lastName}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            disabled
            //label="First name"
            name="email"
            value={formData.email}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Message here..."
            name="message"
            value={formData.message}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            minRows={4}
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

export default HealthComplaintsForm;
