import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// custom components
import HomeCards from '../components/cards/homeCards/HomeCards';
// custom component
import ColorButton from '../components/customButton/CustomButton';

// assets
import logo from '../assets/media/logos/logo.svg';

const Home: React.FC = () => {
  const user = useContext(UserContext);
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div>
      <HomeCards />
    </div>
  );
};

export default Home;
