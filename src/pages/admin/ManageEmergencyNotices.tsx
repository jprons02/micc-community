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

const ManageEmergencyNotices: React.FC = () => {
  const setEmergencyNotices = useContext(SetEmergencyNoticesContext);

  // rerender when new notice is created so new notice is displayed
  const [rerender, setRerender] = useState<boolean>(false);
  const rerenderEmergencyNotices = () => {
    setRerender(!rerender);
  };

  useEffect(() => {
    emergencyNoticesCall();
  }, [rerender]);

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
      <div>
        <AddEmergencyNotice rerenderNotices={rerenderEmergencyNotices} />
      </div>
      <div style={{ marginTop: '70px' }}>
        <h3 style={{ marginBottom: '-20px' }}>Emergency Notices:</h3>
        <EmergencyNoticesList />
      </div>
    </Container>
  );
};

export default ManageEmergencyNotices;
