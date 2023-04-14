import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkAnchor from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ForgotPasswordForm: React.FC = () => {
  const [formData, setFormData] = React.useState({
    email: '',
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Perform form submission logic or validation here
    console.log('Form Data:', formData);
  };

  return (
    <div>
      <CssBaseline />
      <form onSubmit={handleSubmit}>
      <Typography style={{marginTop: '15px'}} variant="body2">Please enter in your email address to reset your password</Typography>
        <TextField
          required
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;