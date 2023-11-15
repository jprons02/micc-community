import React, { useContext } from 'react';
import '../../../assets/styles/css/pages/Home.css';
import { useNavigate } from 'react-router-dom';

// custom components
import CustomButton from '../../customButton/CustomButton';

//context
import { UserContext } from '../../../context/userContext';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const HomeCards: React.FC = () => {
  const user = useContext(UserContext);
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));
  let navigate = useNavigate();

  const isAdmin = () => {
    if (user.type) {
      if (user.type === 'admin') {
        return true;
      }
    }
    return false;
  };

  const standardServices = [
    {
      title: 'Tribal Notices',
      link: '/tribal-notices',
      color: '#128324',
      disabled: false,
    },
    {
      title: 'Events Calendar',
      link: '/calendar',
      color: '#125A83',
      disabled: false,
    },
    { title: 'Fire', link: '', color: '#C23B3B', disabled: true },
    { title: 'Police', link: '', color: '#17217B', disabled: true },
    { title: 'Library', link: '', color: '#511283', disabled: true },
    { title: 'School', link: '', color: '#6D9CE4', disabled: true },
    { title: 'Health', link: '/health', color: '#7A8312', disabled: false },
    { title: 'Day Care', link: '', color: '#1EB298', disabled: true },
    { title: 'Senior Center', link: '', color: '#5066B2', disabled: true },
    { title: 'Job Listings', link: '', color: '#a1c773', disabled: true },
    { title: 'Internships', link: '', color: '#285FEB', disabled: true },
    { title: 'Community Programs', link: '', color: '#EE7391', disabled: true },
    {
      title: 'Greeting Cards',
      link: '/holidaycards',
      color: '#fc1515',
      disabled: false,
    },
    { title: 'FAQs', link: '', color: '#885151', disabled: true },
    { title: 'How to', link: '', color: '#0FB853', disabled: true },
  ];

  const adminTools = [
    {
      title: 'Manage Tribal Notices',
      link: '/admin/notices',
      disabled: isAdmin() ? false : true,
    },
  ];

  const handleClick = (item: any) => {
    if (item.link !== '' && item.disabled !== true) {
      navigate(item.link);
    }
  };

  const renderAdminToolCards = () => {
    return adminTools.map((item) => {
      return (
        <CustomButton
          key={item.title}
          onClick={() => handleClick(item)}
          disabled={item.disabled}
          variant="contained"
          className="card"
          style={!item.disabled ? { backgroundColor: '#363636' } : {}}
        >
          {item.title}
        </CustomButton>
      );
    });
  };

  const renderCard = () => {
    return standardServices.map((item) => {
      return (
        <CustomButton
          key={item.title}
          onClick={() => handleClick(item)}
          disabled={item.disabled}
          variant="contained"
          className="card"
          style={!item.disabled ? { backgroundColor: item.color } : {}}
        >
          {item.title}
        </CustomButton>
      );
    });
  };

  return (
    <React.Fragment>
      <div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '10px' }}>Admin Tools</h2>
          <div className="card-container">{renderAdminToolCards()}</div>
        </div>
        <div>
          <h2 style={{ marginBottom: '10px' }}>Services & Info</h2>
          <div className="card-container">{renderCard()}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeCards;
