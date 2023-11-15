import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// custom component
import CustomButton from '../customButton/CustomButton';

const HomeButton: React.FC = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  const renderButton = () => {
    const style: React.CSSProperties = {
      position: 'absolute',
      top: '10px',
      left: '0',
      fontSize: '11px',
      textTransform: 'uppercase',
      color: '#1976d2',
      cursor: 'pointer',
      fontWeight: '600',
      padding: '5px 0px',
    };
    return (
      <div style={style} onClick={handleClick}>
        Home
      </div>
    );
  };

  return renderButton();
};

export default HomeButton;

/*
return (
  <CustomButton
    variant="text"
    onClick={handleClick}
    disabled={false}
    className={''}
    style={{
      position: 'absolute',
      left: '0',
      fontSize: '11px',
      paddingLeft: '0px',
      marginLeft: '-10px',
    }}
  >
    Home
  </CustomButton>
);
*/
