import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../lib/notistack';
import { createNewPassword } from '../../services/functions/createNewPassword';

// Material UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormPaper } from '../../assets/styles/styledComponents/formPaper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface CreateNewPasswordFormProps {
  record: any;
}

const CreateNewPasswordForm: React.FC<CreateNewPasswordFormProps> = (props) => {
  let navigate = useNavigate();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  const [formData, setFormData] = React.useState({
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
    setLoading(true);
    if (confirmPasswordInputError) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    } else {
      if (props.record !== '') {
        if (
          (await createNewPassword(props.record.id, formData.password)) ===
          'Item updated'
        ) {
          enqueueSnackbar('Your password has been updated.', {
            variant: 'success',
          });
          navigate('/login');
        } else {
          enqueueSnackbar(
            'Something went wrong. Try clicking the link again from your email.',
            {
              variant: 'error',
            }
          );
        }
      } else {
        enqueueSnackbar(
          'Something went wrong. Try clicking the link again from your email.',
          {
            variant: 'error',
          }
        );
      }
      setLoading(false);

      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormPaper>
        <FormControl fullWidth>
          <FormLabel component="h1" sx={{ fontSize: '22px' }}>
            Create a new password
          </FormLabel>
          <TextField
            required
            type="password"
            label="New Password"
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
          <div style={{ position: 'relative' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
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
        </FormControl>
      </FormPaper>
    </form>
  );
};

export default CreateNewPasswordForm;
