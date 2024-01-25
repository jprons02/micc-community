import React from 'react';
import EmergencyNoticesList from '../components/lists/EmergencyNotices';

//material-ui
import { Container } from '@mui/material';

const EmergencyNotices: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <div style={{ marginTop: '70px' }}>
        <h3
          style={{
            marginBottom: '-20px',
            fontSize: '20px',
            textTransform: 'uppercase',
          }}
        >
          Emergency Notices:
        </h3>
        <EmergencyNoticesList />
      </div>
    </Container>
  );
};

export default EmergencyNotices;
