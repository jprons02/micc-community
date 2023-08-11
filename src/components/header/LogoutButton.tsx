import React, { useContext } from 'react';

// custom component
import CustomButton from '../customButton/CustomButton';

// context
import { SetLoginContext } from '../../context/loginContext';

const LogoutButton: React.FC = () => {
  const setIsLoggedIn = useContext(SetLoginContext);

  const handleClick = () => {
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  const renderButton = () => {
    const style: React.CSSProperties = {
      position: 'absolute',
      right: '0',
      fontSize: '11px',
      textTransform: 'uppercase',
      color: '#1976d2',
      cursor: 'pointer',
      fontWeight: '600',
      padding: '5px 0px',
    };
    return (
      <div style={style} onClick={handleClick}>
        Logout
      </div>
    );
  };

  return renderButton();
};

export default LogoutButton;

/*
return (
  <CustomButton
    variant="text"
    onClick={handleClick}
    disabled={false}
    className={''}
    style={{
      position: 'absolute',
      right: '0',
      fontSize: '11px',
      paddingRight: '0px',
      marginRight: '-6px',
    }}
  >
    Logout
  </CustomButton>
);
*/
