import React from 'react';
import Button from '@mui/material/Button';

interface HealthNavProps {
  selectedPage: {
    health: boolean;
    wellness: boolean;
    complaints: boolean;
    portal: boolean;
  };
  handleClick: (section: string) => void;
}

const HealthNav: React.FC<HealthNavProps> = ({ selectedPage, handleClick }) => {
  const buttonStyle = { marginRight: '10px', marginBottom: '10px' };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '40px' /*justifyContent: 'center'*/,
      }}
    >
      <Button
        onClick={() => handleClick('health')}
        style={buttonStyle}
        //variant={'outlined'}
        variant={selectedPage.health ? 'contained' : 'outlined'}
      >
        Health
      </Button>
      <Button
        onClick={() => handleClick('wellness')}
        style={buttonStyle}
        variant={selectedPage.wellness ? 'contained' : 'outlined'}
      >
        Wellness
      </Button>
      <Button
        onClick={() => handleClick('complaints')}
        style={buttonStyle}
        variant={selectedPage.complaints ? 'contained' : 'outlined'}
      >
        Suggestions/Grievances
      </Button>
      <Button
        onClick={() => handleClick('portal')}
        style={buttonStyle}
        variant={selectedPage.portal ? 'contained' : 'outlined'}
      >
        Patient Portal
      </Button>
    </div>
  );
};

export default HealthNav;
