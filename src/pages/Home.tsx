import React, { useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginContext } from '../context/loginContext';
import { UserContext } from '../context/userContext';
import { keys } from '../data/keys';

// material-ui
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// assets
import logo from '../assets/media/logos/logo.svg';

const Home: React.FC = () => {
  const isLoggedIn = useContext(LoginContext);
  const user = useContext(UserContext);
  let navigate = useNavigate();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  /*
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn]);
  */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link to="/calendar">GO TO CALENDAR</Link>
        <div style={{ margin: '40px 0' }}></div>
      </header>
    </div>
  );
};

export default Home;
