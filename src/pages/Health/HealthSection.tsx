import React from 'react';

const HealthSection: React.FC = () => {
  const sectionStyle = {
    marginBottom: '40px',
  };

  return (
    <div>
      <div style={sectionStyle}>
        <h4>Mission</h4>
        <p>
          Working together with our community and stakeholders to ensure our
          wellbeing for generations.
        </p>
      </div>
      <div style={sectionStyle}>
        <h4>Vision</h4>
        <p>
          We are a Native Community, deeply rooted in our traditional beliefs
          and customs. Our mental, physical, and spiritual wellness is at the
          forefront of our actions and we aim to integrate our beliefs in our
          day to day practices.
        </p>
      </div>
      <div style={sectionStyle}>
        <h4>Contact</h4>
        <p>Hours: 8:30 AM - 4:30 PM</p>
        <p>Phone: xxx-xxx-xxxx</p>
        <p>Email: example@domain.com</p>
        <p>Fax: xxx-xxx-xxxx</p>
      </div>
      <div style={sectionStyle}>
        <h4>Meet Our Staff</h4>
        <p>
          Health Department Staff 1-paragraph biographies with: (a) Name, (b)
          thumbnail picture, (c) # of years serving Miccosukee, (d) Experience
          and Qualifications
        </p>
      </div>
      <div style={sectionStyle}>
        <h4>Culturally Sensitive and pertinent Health Education</h4>
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
