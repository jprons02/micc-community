import React, { useState, useEffect } from 'react';
import { lostPasswordEmailFunction } from '../../services/functions/lostPasswordEmailFunction';
import { useSnackbar } from '../../lib/notistack';
import useGoogleRecaptcha from '../../hooks/useReCaptcha';
import { recaptchaTest } from '../../services/functions/recaptchaTest';

// Material UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormPaper } from '../../assets/styles/styledComponents/formPaper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const ForgotPasswordForm: React.FC = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  const [formData, setFormData] = React.useState({
    email: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<string | null>(null);

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
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    // Perform form submission logic or validation here
    const response = await lostPasswordEmailFunction(formData.email);
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
    <form onSubmit={handleSubmit}>
      <FormPaper>
        <FormControl fullWidth>
          <FormLabel component="h1" sx={{ fontSize: '22px' }}>
            Let's get that password for you
          </FormLabel>
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
                Submit
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
          {error === 'Email not found' ? (
            <div style={{ textAlign: 'center' }}>
              {/* USING ANCHOR IN STEAD OF LINK SO THAT THE RECAPTCHA IFRAME LOADS CORRECTLY */}
              <a href="/signup">Don't have an account? Sign Up</a>
            </div>
          ) : (
            ''
          )}
        </FormControl>
      </FormPaper>
    </form>
  );
};

export default ForgotPasswordForm;
