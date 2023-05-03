import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetLoginContext } from '../../context/loginContext';
import { logInFunction } from '../../services/functions/logInFunction';
import { useSnackbar } from '../../lib/notistack';
import useGoogleRecaptcha from '../../hooks/useReCaptcha';
import { recaptchaTest } from '../../services/functions/recaptchaTest';

// material-ui
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const LoginForm: React.FC = () => {
  let navigate = useNavigate();
  let [error, setError] = useState<string | null>(null);

  const setIsLoggedIn = useContext(SetLoginContext);

  // variant could be success, error, warning, info, or default
  // example use) enqueueSnackbar("Form submitted successfully!", { variant: "success" });
  const { enqueueSnackbar } = useSnackbar();

  type formData = {
    email: string;
    tribalId: string;
    password: string;
  };
  const [formData, setFormData] = useState<formData>({
    email: '',
    tribalId: '',
    password: '',
  });

  const [loading, setLoading] = useState<boolean>(false);

  const { token, renderReCAPTCHA } = useGoogleRecaptcha();
  const [recaptchaResult, setRecaptchaResult] = useState<boolean | null>(false);

  useEffect(() => {
    recaptchaTest(token).then((result) => {
      if (result) {
        setRecaptchaResult(true);
        console.log('recaptcha test passed');
      } else {
        setRecaptchaResult(false);
        console.log('recaptcha test failed');
      }
    });
  }, [token]);

  type eventType = React.ChangeEvent<HTMLInputElement>;
  const handleChange = (event: eventType) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    // Perform form submission logic or validation here
    let result = await logInFunction(formData);
    switch (result) {
      case 'Success':
        setLoading(false);
        setIsLoggedIn(true);
        navigate('/home');
        enqueueSnackbar("You've successfully logged in!", {
          variant: 'success',
        });
        break;
      case 'Email not found':
        setError('Email not found');
        setLoading(false);
        enqueueSnackbar('Email not found', { variant: 'error' });
        break;
      case 'Incorrect password':
        setError('Incorrect password');
        setLoading(false);
        enqueueSnackbar('Incorrect password', { variant: 'error' });
        break;
      case 'Incorrect tribalId':
        setError('Incorrect tribalId');
        setLoading(false);
        enqueueSnackbar('Incorrect tribalId', { variant: 'error' });
        break;
      default:
        setError('Server error');
        setLoading(false);
        console.log('result server error: ', result);
        enqueueSnackbar('Server error, please try again.', {
          variant: 'error',
        });
    }
  };

  return (
    <div>
      <CssBaseline />
      <form onSubmit={handleSubmit}>
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
          label="Password"
          name="password"
          value={formData.password}
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
        {renderReCAPTCHA()}
        <div style={{ position: 'relative' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading === true || recaptchaResult !== true}
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
        {/* USING ANCHOR IN STEAD OF LINK SO THAT THE RECAPTCHA IFRAME LOADS CORRECTLY */}
        <div style={{ textAlign: 'center' }}>
          <a href="/forgot-password">Forgot password?</a>
          &nbsp;&nbsp;
          <a href="/signup">Don't have an account? Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
