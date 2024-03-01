import React, { useState, useContext, useEffect } from 'react';
import AddEmergencyNotice from '../../components/forms/AddEmergencyNotice';

//APIs
import { getAllItemsAPI } from '../../services/APIs/getAllItemsAPI';

// data
import { keys } from '../../data/keys';

// custom component
import EmergencyNoticesList from '../../components/lists/EmergencyNotices';

// context
import { SetEmergencyNoticesContext } from '../../context/emergencyNotices';

//material-ui
import { Container } from '@mui/material';

const ManageEmergencyNoticePage: React.FC = () => {
  const setEmergencyNotices = useContext(SetEmergencyNoticesContext);

  useEffect(() => {
    emergencyNoticesCall();
  }, []);

  const emergencyNoticesCall = async () => {
    const response = await getAllItemsAPI(keys.webTableName);
    // Filter objects with the key "emergencyNotice"
    const emergencyNotices = response.filter((obj: any) =>
      obj.hasOwnProperty('emergencyNotice')
    );
    setEmergencyNotices(await emergencyNotices);
  };

  return (
    <Container maxWidth="lg">
      <div style={{ marginTop: '70px' }}>
        <h3 style={{ marginBottom: '-20px' }}>Emergency Notices:</h3>
        <EmergencyNoticesList />
      </div>
    </Container>
  );
};

export default ManageEmergencyNoticePage;
