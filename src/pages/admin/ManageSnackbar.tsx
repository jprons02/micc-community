/*
import React, { useState, useContext, useEffect } from 'react';
import UpdateSnackbarInfo from '../../components/forms/UpdateSnackbarInfo';

import RestaurantStatusForm from '../../components/forms/Snackbar/RestaurantStatus';
import SnackbarSpecialForm from '../../components/forms/Snackbar/SnackbarSpecialDetails';
import SnackbarSpecialPriceForm from '../../components/forms/Snackbar/SnackbarSpecialPrice';

//APIs
import { getAllItemsAPI } from '../../services/APIs/getAllItemsAPI';

// data
import { keys } from '../../data/keys';

// context
import { SetSnackbarContext } from '../../context/snackbar';
import { SnackbarContext } from '../../context/snackbar';

//material-ui
import { Container } from '@mui/material';

const ManageSnackbar: React.FC = () => {
  const setSnackbarInfo = useContext(SetSnackbarContext);
  const snackbarInfo = useContext(SnackbarContext);

  // rerender when new notice is created so new notice is displayed
  const [rerender, setRerender] = useState<boolean>(false);
  const rerenderSnackbarInfo = () => {
    setRerender(!rerender);
  };

  useEffect(() => {
    snackbarCall();
  }, [rerender]);

  const snackbarCall = async () => {
    const response = await getAllItemsAPI(keys.webTableName);
    // Filter objects with the key "emergencyNotice"
    const snackbarRecord = response.find((obj: any) => obj.id === "snackbar");
    setSnackbarInfo(await snackbarRecord);
  };

  return (
    <Container maxWidth="lg">
      <div>
        <UpdateSnackbarInfo rerenderSnackbarInfo={rerenderSnackbarInfo} />
      </div>
      <div style={{ marginTop: '70px' }}>
        <h3>Snackbar Info:</h3>
        <p>Snackbar Status: {snackbarInfo.snackbarStatus}</p>
        <p>Snackbar Special Details: {snackbarInfo.snackbarSpecial}</p>
        <p>Snackbar Special Price: ${snackbarInfo.snackbarSpecialPrice}</p>
      </div>
    </Container>
  );
};

export default ManageSnackbar;
*/



import React, { useState, useContext, useEffect } from 'react';
import UpdateSnackbarInfo from '../../components/forms/UpdateSnackbarInfo';

import RestaurantStatusForm from '../../components/forms/Snackbar/RestaurantStatus';
import SnackbarSpecialForm from '../../components/forms/Snackbar/SnackbarSpecialDetails';
import SnackbarSpecialPriceForm from '../../components/forms/Snackbar/SnackbarSpecialPrice';

//APIs
import { getAllItemsAPI } from '../../services/APIs/getAllItemsAPI';

// data
import { keys } from '../../data/keys';

// context
import { SetSnackbarContext } from '../../context/snackbar';
import { SnackbarContext } from '../../context/snackbar';

//material-ui
import { Container } from '@mui/material';

const ManageSnackbar: React.FC = () => {
  const setSnackbarInfo = useContext(SetSnackbarContext);
  const snackbarInfo = useContext(SnackbarContext);

  // rerender when new notice is created so new notice is displayed
  const [rerender, setRerender] = useState<boolean>(false);
  const rerenderSnackbarInfo = () => {
    setRerender(!rerender);
  };

  useEffect(() => {
    snackbarCall();
  }, [rerender]);

  const snackbarCall = async () => {
    const response = await getAllItemsAPI(keys.webTableName);
    // Filter objects with the key "emergencyNotice"
    const snackbarRecord = response.find((obj: any) => obj.id === "snackbar");
    setSnackbarInfo(await snackbarRecord);
  };

  return (
    <Container maxWidth="lg">
      <div>
        <div style={{marginBottom: '50px'}}><RestaurantStatusForm rerenderSnackbarInfo={rerenderSnackbarInfo} /></div>
        <div style={{marginBottom: '50px'}}><SnackbarSpecialForm rerenderSnackbarInfo={rerenderSnackbarInfo} /></div>
        <div><SnackbarSpecialPriceForm rerenderSnackbarInfo={rerenderSnackbarInfo} /></div>
      </div>
      <div style={{ marginTop: '70px', paddingBottom: '40px' }}>
        <h3>Current Snackbar Info:</h3>
        <p>Snackbar Status: {snackbarInfo.snackbarStatus}</p>
        <p>Snackbar Special Details: {snackbarInfo.snackbarSpecial}</p>
        <p>Snackbar Special Price: ${snackbarInfo.snackbarSpecialPrice}</p>
      </div>
    </Container>
  );
};

export default ManageSnackbar;