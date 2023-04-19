import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { lostPasswordFunction } from '../../services/functions/lostPasswordFunction';
import { useSnackbar } from '../../lib/notistack';

// Material UI
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkAnchor from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const ForgotPasswordForm: React.FC = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<string | null>(null);

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
    // Perform form submission logic or validation here
    const response = await lostPasswordFunction(formData.email);
    setLoading(false);
    switch (response) {
      case 'Success':
        setLoading(false);
        enqueueSnackbar('Please check your email for a reset link.', {
          variant: 'success',
        });
        break;
      case 'Email not found':
        setError('Email not found');
        enqueueSnackbar('Email not found.', {
          variant: 'error',
        });
        break;
      default:
        setError('Server error');
        console.log('result server error: ', response);
        enqueueSnackbar('Server error, please try again.', {
          variant: 'error',
        });
    }
  };

  return (
    <div>
      <CssBaseline />
      <form onSubmit={handleSubmit}>
        <Typography style={{ marginTop: '15px' }} variant="body2">
          Please enter in your email address to reset your password
        </Typography>
        <TextField
          required
          label="Email"
          name="email"
          value={formData.email}
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
            <span style={loading ? { visibility: 'hidden' } : {}}>Log In</span>
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
        {error === 'Email not found' ? (
          <div style={{ textAlign: 'center' }}>
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </div>
        ) : (
          ''
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
