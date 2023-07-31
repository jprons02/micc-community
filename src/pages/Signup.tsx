import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/forms/SignupForm';
import { LoginContext } from '../context/loginContext';

// material-ui
import { Container } from '@mui/material';

const Signup: React.FC = () => {
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
        <SignupForm />
      </div>
    </Container>
  );
};

export default Signup;
