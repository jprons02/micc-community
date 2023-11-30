import React from 'react';
import TribalNoticesList from '../components/lists/TribalNotices';

//material-ui
import { Container } from '@mui/material';

const TribalNotices: React.FC = () => {
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
          Tribal Notices:
        </h3>
        <TribalNoticesList />
      </div>
    </Container>
  );
};

export default TribalNotices;
