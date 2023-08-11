import React, { useState, useContext, useEffect } from 'react';
import AddTribalNotice from '../../components/forms/AddTribalNotice';

//APIs
import { getAllItemsAPI } from '../../services/APIs/getAllItemsAPI';

// data
import { keys } from '../../data/keys';

// custom component
import TribalNoticesList from '../../components/lists/TribalNotices';

// context
import { SetTribalNoticesContext } from '../../context/tribalNotices';

const ManageTribalNotices: React.FC = () => {
  const setTribalNotices = useContext(SetTribalNoticesContext);

  // rerender when new notice is created so new notice is displayed
  const [rerender, setRerender] = useState<boolean>(false);
  const rerenderTribalNotices = () => {
    setRerender(!rerender);
  };

  useEffect(() => {
    tribalNoticesCall();
  }, [rerender]);

  const tribalNoticesCall = async () => {
    const response = await getAllItemsAPI(keys.webTableName);
    setTribalNotices(await response);
  };

  return (
    <div>
      <div>
        <AddTribalNotice rerenderNotices={rerenderTribalNotices} />
      </div>
      <div style={{ marginTop: '70px' }}>
        <h3 style={{ marginBottom: '-20px' }}>Tribal Notices:</h3>
        <TribalNoticesList />
      </div>
    </div>
  );
};

export default ManageTribalNotices;
