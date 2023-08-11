import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import { LoginContext } from '../context/loginContext';

// material-ui
import { Container } from '@mui/material';

const Login: React.FC = () => {
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
        <h1 style={{ textAlign: 'center', marginBottom: '35px' }}>
          miccosukee.community
        </h1>
        <LoginForm />
      </div>
    </Container>
  );
};

export default Login;
