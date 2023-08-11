import React from 'react';
import TribalNoticesList from '../components/lists/TribalNotices';

const TribalNotices: React.FC = () => {
  return (
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
  );
};

export default TribalNotices;
