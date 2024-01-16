import React, { useState, useEffect } from 'react';
import { useSnackbar } from '../../lib/notistack';
import { addUserFunction } from '../../services/functions/addUserFunction';
import { useNavigate } from 'react-router-dom';
import useGoogleRecaptcha from '../../hooks/useReCaptcha';
import { recaptchaTest } from '../../services/functions/recaptchaTest';

// material-ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormPaper } from '../../assets/styles/styledComponents/formPaper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const SignupForm: React.FC = () => {
  let navigate = useNavigate();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

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

  const { token, renderReCAPTCHA } = useGoogleRecaptcha();
  const [recaptchaResult, setRecaptchaResult] = useState<boolean | null>(false);

  useEffect(() => {
    recaptchaTest(token).then((result) => {
      if (result) {
        setRecaptchaResult(true);
      } else {
        setRecaptchaResult(false);
      }
    });
  }, [token]);

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

    if (name === 'password') {
      if (formData.confirmPassword !== value) {
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
      const user = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        tribalId: formData.tribalId,
        password: formData.password,
      };
      const response = await addUserFunction(user);
      if (response === 'Item added') {
        enqueueSnackbar("You've successfully signed up!", {
          variant: 'success',
        });
        navigate('/login');
      } else if (response === 'Tribal ID already exists') {
        enqueueSnackbar('This Tribal ID already exists.', {
          variant: 'error',
        });
      } else if (response === 'Tribal ID not found.') {
        enqueueSnackbar('Tribal ID not found.', {
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
    <form onSubmit={handleSubmit}>
      <FormPaper>
        <FormControl fullWidth>
          <FormLabel component="h1" sx={{ fontSize: '22px' }}>
            Sign Up
          </FormLabel>
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
            //label="Tribal ID"
            type="password"
            label="PIN"
            name="tribalId"
            value={formData.tribalId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            type="password"
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
          {renderReCAPTCHA()}
          <div style={{ position: 'relative' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading === true || recaptchaResult !== true}
              sx={{ mt: 3, mb: 2 }}
            >
              <span style={loading ? { visibility: 'hidden' } : {}}>
                Sign Up
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

export default SignupForm;
