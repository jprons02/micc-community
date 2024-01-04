import React, { useState } from 'react';
import HealthStaffNameSlider from '../../components/slider/HealthStaffNameSlider';

// styles
import '../../assets/styles/css/pages/Health.css';

// staff bios
import { staffBiosArray } from '../../data/health/bios.js';

const HealthSection: React.FC = () => {
  const sectionStyle = {
    marginBottom: '40px',
  };

  const staffNameArray = staffBiosArray.map(({ name }: { name: string }) => ({
    name,
  }));

  const [staffSelected, setStaffSelected] = useState('Cassandra Osceola');

  const handleStaffClick = (name: string) => {
    setStaffSelected(name);
  };

  const subHeaderBioStyle = {
    fontStyle: 'italic',
    fontSize: '14px',
    margin: '0 0 5px 0',
  };

  const renderBios = () => {
    return staffBiosArray.map(
      (item: {
        name: string;
        image: string;
        title: string;
        years: string;
        months: string;
        experience: string;
        details: string;
      }) => {
        if (item.name === staffSelected) {
          return (
            <div key={item.name}>
              <div>
                <img
                  style={{
                    width: '100px',
                    float: 'left',
                    padding: '0 20px 20px 0px',
                  }}
                  src={item.image}
                  alt="staff"
                />
              </div>
              <div>
                <h4 style={{ marginBottom: '10px' }}>{item.name}</h4>
                <p style={subHeaderBioStyle}>{item.title}</p>
                <p style={subHeaderBioStyle}>
                  {item.months === ''
                    ? `${item.years} years serving Miccosukee`
                    : `${item.months} months serving Miccosukee`}
                </p>
                <p style={subHeaderBioStyle}>{item.experience}</p>
              </div>
              <div style={{ clear: 'both', maxWidth: '620px' }}>
                <p>{item.details}</p>
              </div>
            </div>
          );
        }
      }
    );
  };

  return (
    <div>
      <div style={sectionStyle}>
        <h4 style={{ textTransform: 'uppercase' }}>Mission</h4>
        <p>
          Working together with our community and stakeholders to ensure our
          wellbeing for generations.
        </p>
      </div>
      <div style={sectionStyle}>
        <h4 style={{ textTransform: 'uppercase' }}>Vision</h4>
        <p>
          We are a Native Community, deeply rooted in our traditional beliefs
          and customs. Our mental, physical, and spiritual wellness is at the
          forefront of our actions and we aim to integrate our beliefs in our
          day to day practices.
        </p>
      </div>
      <div style={sectionStyle}>
        <h4 style={{ textTransform: 'uppercase' }}>Contact</h4>
        <p>Hours: 8:30 AM - 4:30 PM</p>
        <p>Phone: xxx-xxx-xxxx</p>
        <p>Email: example@domain.com</p>
      </div>
      <div style={sectionStyle}>
        <h4 style={{ textTransform: 'uppercase' }}>Events</h4>
        <p>
          Events here pulled from calendar with specific health tag or from
          different calendar
        </p>
      </div>
      <div style={sectionStyle}>
        <h4 style={{ textTransform: 'uppercase' }}>Meet Our Staff</h4>
        <div
          style={{
            marginLeft: '25px',
          }}
        >
          <HealthStaffNameSlider
            sliderWidth="500px"
            selectedName={staffSelected}
            nameArray={staffNameArray}
            handleStaffClick={handleStaffClick}
          />
        </div>
        <div style={{ marginBottom: '60px' }}>{renderBios()}</div>
      </div>
      <div style={sectionStyle}>
        <h4 style={{ textTransform: 'uppercase' }}>
          Culturally Sensitive and pertinent Health Education
        </h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default HealthSection;

//<ImageSlider sliderWidth="500px" imageArray={imageArray} />
