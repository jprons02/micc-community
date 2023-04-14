import React, { useState } from 'react';
import { useSnackbar } from '../../lib/notistack';
import { addUserFunction } from '../../services/functions/addUserFunction';
import { useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const SignupForm: React.FC = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    tribalId: '',
    password: '',
    confirmPassword: '',
  });

  const [confirmPasswordInputError, setConfirmPasswordInputError] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  // variant could be success, error, warning, info, or default
  // example use) enqueueSnackbar("Form submitted successfully!", { variant: "success" });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'confirmPassword') {
      if (formData.password !== value) {
        setConfirmPasswordInputError(true);
      } else {
        setConfirmPasswordInputError(false);
      }
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (confirmPasswordInputError) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    } else {
      setLoading(true);
      console.log('Form Data:', formData);
      const user = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        tribalId: formData.tribalId,
        password: formData.password,
      };
      const response = await addUserFunction(user);
      if (response === 'success') {
        enqueueSnackbar("You've successfully signed up!", {
          variant: 'success',
        });
        navigate('/login');
      } else if (response === 'Tribal ID already exists') {
        enqueueSnackbar('This Tribal ID already exists.', {
          variant: 'error',
        });
      } else {
        enqueueSnackbar('Something went wrong. Please try again.', {
          variant: 'error',
        });
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <CssBaseline />
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="First name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          required
          label="Last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          required
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          required
          label="Tribal ID"
          name="tribalId"
          value={formData.tribalId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          required
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          required
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={confirmPasswordInputError}
          label={confirmPasswordInputError ? 'Error' : 'Confirm password'}
          helperText={
            confirmPasswordInputError ? 'Password does not match.' : ''
          }
        />
        <div style={{ position: 'relative' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            <span style={loading ? { visibility: 'hidden' } : {}}>Sign Up</span>
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
      </form>
    </div>
  );
};

export default SignupForm;
