// get record of id and then compare the lostPasswordCode to record.lostPasswordCode
// if they match, then allow the user to change their password
// if they don't match, then redirect to login page

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../context/loginContext';
import { getItemByAttribute } from '../services/APIs/getItemByAttribute';

// material-ui
import { Container } from '@mui/material';
import CreateNewPasswordForm from '../components/forms/CreateNewPasswordForm';

import { keys } from '../data/keys';

const ForgotPassword: React.FC = () => {
  const isLoggedIn = useContext(LoginContext);
  const { userId, lostPasswordCode } = useParams();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [record, setRecord] = useState<any>('');
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
    if (!userId || !lostPasswordCode) {
      navigate('/login');
    }
  }, [isLoggedIn, userId, lostPasswordCode]);

  useEffect(() => {
    const checkNewPasswordCode = async () => {
      if (userId) {
        const user = await getItemByAttribute(keys.userTableName, 'id', userId);

        if (user.lostPasswordCode === lostPasswordCode) {
          setRecord(user);
          return setShowForm(true);
        } else {
          return navigate('/login');
        }
      } else {
        return navigate('/login');
      }
    };
    checkNewPasswordCode();
  }, [userId, lostPasswordCode]);

  return (
    <Container component="main" maxWidth="md">
      <div style={{ marginTop: '50px' }}>
        {showForm && <CreateNewPasswordForm record={record} />}
      </div>
    </Container>
  );
};

export default ForgotPassword;
