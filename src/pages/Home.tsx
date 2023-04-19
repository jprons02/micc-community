import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/loginContext';

// material-ui
import Button from '@mui/material/Button';

// assets
import logo from '../assets/media/logos/logo.svg';

const Home: React.FC = () => {
  const isLoggedIn = useContext(LoginContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div style={{ margin: '40px 0' }}></div>
      </header>
    </div>
  );
};

export default Home;
