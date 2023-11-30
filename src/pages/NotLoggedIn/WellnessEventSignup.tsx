import React, { useContext, useEffect } from 'react';
import WellnessEventRegisterForm from '../../components/forms/Health/WellnessEventRegisterForm';

// material-ui
import { Container } from '@mui/material';

const WellnessEventSignup: React.FC = () => {
  return (
    <Container component="main" maxWidth="md">
      <div style={{ marginTop: '50px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '35px' }}>
          miccosukee.community
        </h1>
        <div>
          <WellnessEventRegisterForm center={true} />
        </div>
      </div>
    </Container>
  );
};

export default WellnessEventSignup;
