import React, { useContext } from 'react';
import AddTribalNotice from '../../components/forms/AddTribalNotice';

// custom component
import TribalNoticesList from '../../components/lists/TribalNotices';

// context
import { TribalNoticesContext } from '../../context/tribalNotices';

const ManageTribalNotices: React.FC = () => {
  const tribalNotices = useContext(TribalNoticesContext);

  return (
    <div>
      <div>
        <AddTribalNotice />
      </div>
      <div style={{ marginTop: '70px' }}>
        <h3>List of Notices:</h3>
        <TribalNoticesList />
      </div>
    </div>
  );
};

export default ManageTribalNotices;
