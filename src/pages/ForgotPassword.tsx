import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/loginContext';

// material-ui
import { Container } from '@mui/material';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';

const ForgotPassword: React.FC = () => {
  const isLoggedIn = useContext(LoginContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn]);

  return (
    <Container component="main" maxWidth="md">
      <div style={{ marginTop: '50px' }}>
        <ForgotPasswordForm />
      </div>
    </Container>
  );
};

export default ForgotPassword;
