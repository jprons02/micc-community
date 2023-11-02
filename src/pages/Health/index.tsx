import React, { useState } from 'react';
import HealthNav from '../../components/entityNav/healthNav';
import HealthSection from './HealthSection';
import ComplaintsSection from './ComplaintsSection';

const HealthIndex: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState({
    health: true,
    wellness: false,
    complaints: false,
    portal: false,
  });

  const handleClick = (section: string) => {
    //create a switch for health wellness complaints and portal
    switch (section) {
      case 'health':
        setSelectedPage({
          health: true,
          wellness: false,
          complaints: false,
          portal: false,
        });
        break;
      case 'wellness':
        setSelectedPage({
          health: false,
          wellness: true,
          complaints: false,
          portal: false,
        });
        break;
      case 'complaints':
        setSelectedPage({
          health: false,
          wellness: false,
          complaints: true,
          portal: false,
        });
        break;
      case 'portal':
        setSelectedPage({
          health: false,
          wellness: false,
          complaints: false,
          portal: true,
        });
        break;
      default:
        setSelectedPage({
          health: true,
          wellness: false,
          complaints: false,
          portal: false,
        });
        break;
    }
  };

  const renderTitle = () => {
    if (selectedPage.health) {
      return 'Health';
    }
    if (selectedPage.wellness) {
      return 'Wellness';
    }
    if (selectedPage.complaints) {
      return 'Complaints/Suggestions';
    }
    if (selectedPage.portal) {
      return 'Patient Portal';
    }
  };

  const renderContent = () => {
    if (selectedPage.health) {
      return <HealthSection />;
    }
    if (selectedPage.wellness) {
      return 'Coming soon...';
    }
    if (selectedPage.complaints) {
      return <ComplaintsSection />;
    }
    if (selectedPage.portal) {
      return 'Coming soon...';
    }
  };

  return (
    <div style={{ marginTop: '70px' }}>
      <div>
        <h3
          style={{
            fontSize: '20px',
            textTransform: 'uppercase',
          }}
        >
          {renderTitle()}
        </h3>
      </div>
      <HealthNav selectedPage={selectedPage} handleClick={handleClick} />
      {renderContent()}
    </div>
  );
};

export default HealthIndex;
