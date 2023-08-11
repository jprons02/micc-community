import React, { useContext } from 'react';

// context
import { TribalNoticesContext } from '../../context/tribalNotices';

const TribalNoticesList: React.FC = () => {
  const tribalNotices = useContext(TribalNoticesContext);

  const arrangeNoticesByDate = () => {
    const newArray = tribalNotices.slice(); // Create a copy of the array using slice()
    newArray.sort(
      (a: any, b: any) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
    return newArray; // Return the sorted array
  };

  const sortedNotices = arrangeNoticesByDate();

  const getReadableDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'America/New_York',
    };

    const date: Date = new Date(dateString);
    const easternTimeString: string = date.toLocaleString('en-US', options);
    return easternTimeString;
  };

  const renderTribalNotices = () => {
    return sortedNotices.map((notice: any) => {
      const dateTime = getReadableDate(notice.dateAdded);
      return (
        <div style={{ marginTop: '40px' }} key={notice.dateAdded}>
          <p>{notice.tribalNotice}</p>
          <p
            style={{
              fontSize: '12px',
              fontStyle: 'italic',
              marginBottom: '-6px',
            }}
          >
            {dateTime}
          </p>
          <p
            style={{
              fontSize: '12px',
              fontStyle: 'italic',
            }}
          >
            {notice.name}
          </p>
        </div>
      );
    });
  };

  return <div>{renderTribalNotices()}</div>;
};

export default TribalNoticesList;
