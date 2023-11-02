import React from 'react';
import HealthComplaintsForm from '../../components/forms/Health/HealthComplaintsForm';

const ComplaintsSection: React.FC = () => {
  return (
    <div>
      <HealthComplaintsForm />
      <p style={{ marginTop: '40px' }}>
        Miccosukee Health Department wishes to be open to suggestions from our
        community on how it wishes to be cared for. This page will serve as a
        location for our community to voice their grievances, complaints, and
        suggestions with Health Department and Tribal Leadership. On this page a
        Community Member can remain anonymous or chose to disclose their
        identity. Only Health Department and Tribal Leadership will be able to
        see these comments and are expected to engage the community positively
        and constructively.
      </p>
    </div>
  );
};

export default ComplaintsSection;
