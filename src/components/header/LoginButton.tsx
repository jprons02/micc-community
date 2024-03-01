import React, { useContext } from 'react';

// custom component
import CustomButton from '../customButton/CustomButton';

const LoginButton: React.FC = () => {
  const handleClick = () => {
    window.location.href = '/login';
  };

  const renderButton = () => {
    const style: React.CSSProperties = {
      position: 'absolute',
      top: '10px',
      right: '10px',
      fontSize: '14px',
      textTransform: 'uppercase',
      color: '#1976d2',
      cursor: 'pointer',
      fontWeight: '600',
      padding: '5px 0px',
    };
    return (
      <div style={style} onClick={handleClick}>
        Login
      </div>
    );
  };

  return renderButton();
};

export default LoginButton;
