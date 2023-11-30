import React, { useState } from 'react';
import HealthStaffNameSlider from '../../components/slider/HealthStaffNameSlider';

// styles
import '../../assets/styles/css/pages/Health.css';

import image1 from '../../assets/media/images/health/icons8-user-100.png';

const HealthSection: React.FC = () => {
  const sectionStyle = {
    marginBottom: '40px',
  };
  const staffArray = [
    {
      name: 'Staff 1',
      image: image1,
      years: '10',
      experience: 'Experience 1',
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae accumsan magna, at rutrum massa. Nam ligula libero, auctor non scelerisque non, ullamcorper vitae elit. Nullam dignissim pharetra dui, a gravida lectus vestibulum in. Donec elementum massa at diam iaculis, a finibus nisi venenatis. Sed egestas leo vel gravida congue. Aenean euismod id tortor ut varius. Donec ultricies tincidunt tortor, id tincidunt sem dignissim eu. Cras sollicitudin laoreet nisi, eu semper metus.',
    },
    {
      name: 'Staff 2',
      image: image1,
      years: '10',
      experience: 'Experience 2',
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae accumsan magna, at rutrum massa. Nam ligula libero, auctor non scelerisque non, ullamcorper vitae elit. Nullam dignissim pharetra dui, a gravida lectus vestibulum in. Donec elementum massa at diam iaculis, a finibus nisi venenatis. Sed egestas leo vel gravida congue. Aenean euismod id tortor ut varius. Donec ultricies tincidunt tortor, id tincidunt sem dignissim eu. Cras sollicitudin laoreet nisi, eu semper metus.',
    },
    {
      name: 'Staff 3',
      image: image1,
      years: '10',
      experience: 'Experience 3',
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae accumsan magna, at rutrum massa. Nam ligula libero, auctor non scelerisque non, ullamcorper vitae elit. Nullam dignissim pharetra dui, a gravida lectus vestibulum in. Donec elementum massa at diam iaculis, a finibus nisi venenatis. Sed egestas leo vel gravida congue. Aenean euismod id tortor ut varius. Donec ultricies tincidunt tortor, id tincidunt sem dignissim eu. Cras sollicitudin laoreet nisi, eu semper metus.',
    },
    {
      name: 'Staff 4',
      image: image1,
      years: '10',
      experience: 'Experience 4',
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae accumsan magna, at rutrum massa. Nam ligula libero, auctor non scelerisque non, ullamcorper vitae elit. Nullam dignissim pharetra dui, a gravida lectus vestibulum in. Donec elementum massa at diam iaculis, a finibus nisi venenatis. Sed egestas leo vel gravida congue. Aenean euismod id tortor ut varius. Donec ultricies tincidunt tortor, id tincidunt sem dignissim eu. Cras sollicitudin laoreet nisi, eu semper metus.',
    },
    {
      name: 'Staff 5',
      image: image1,
      years: '10',
      experience: 'Experience 5',
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae accumsan magna, at rutrum massa. Nam ligula libero, auctor non scelerisque non, ullamcorper vitae elit. Nullam dignissim pharetra dui, a gravida lectus vestibulum in. Donec elementum massa at diam iaculis, a finibus nisi venenatis. Sed egestas leo vel gravida congue. Aenean euismod id tortor ut varius. Donec ultricies tincidunt tortor, id tincidunt sem dignissim eu. Cras sollicitudin laoreet nisi, eu semper metus.',
    },
    {
      name: 'Staff 6',
      image: image1,
      years: '10',
      experience: 'Experience 6',
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae accumsan magna, at rutrum massa. Nam ligula libero, auctor non scelerisque non, ullamcorper vitae elit. Nullam dignissim pharetra dui, a gravida lectus vestibulum in. Donec elementum massa at diam iaculis, a finibus nisi venenatis. Sed egestas leo vel gravida congue. Aenean euismod id tortor ut varius. Donec ultricies tincidunt tortor, id tincidunt sem dignissim eu. Cras sollicitudin laoreet nisi, eu semper metus.',
    },
    {
      name: 'Staff 7',
      image: image1,
      years: '10',
      experience: 'Experience 7',
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae accumsan magna, at rutrum massa. Nam ligula libero, auctor non scelerisque non, ullamcorper vitae elit. Nullam dignissim pharetra dui, a gravida lectus vestibulum in. Donec elementum massa at diam iaculis, a finibus nisi venenatis. Sed egestas leo vel gravida congue. Aenean euismod id tortor ut varius. Donec ultricies tincidunt tortor, id tincidunt sem dignissim eu. Cras sollicitudin laoreet nisi, eu semper metus.',
    },
  ];

  const staffNameArray = staffArray.map(({ name }) => ({ name }));

  const [staffSelected, setStaffSelected] = useState('Staff 1');

  const handleStaffClick = (name: string) => {
    setStaffSelected(name);
  };

  const renderBios = () => {
    return staffArray.map((item) => {
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
              <h4>{item.name}</h4>
              <p>Years Serving Miccosukee: {item.years}</p>
              <p>Experience and Qualifications: {item.experience}</p>
            </div>
            <div style={{ clear: 'both' }}>
              <p>{item.details}</p>
            </div>
          </div>
        );
      }
    });
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
