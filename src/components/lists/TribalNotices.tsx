import React, { useContext } from 'react';

// context
import { TribalNoticesContext } from '../../context/tribalNotices';

const TribalNoticesList: React.FC = () => {
  const tribalNotices = useContext(TribalNoticesContext);

  const renderTribalNotices = () => {
    return tribalNotices.map((notice: any) => {
      return (
        <div key={notice.dateAdded}>
          <p>{notice.tribalNotice}</p>
          <p>{notice.dateAdded}</p>
        </div>
      );
    });
  };

  return <div>{renderTribalNotices()}</div>;
};

export default TribalNoticesList;
