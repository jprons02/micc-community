import React, { useContext } from 'react';

// context
import { EmergencyNoticesContext } from '../../context/emergencyNotices';

const EmergencyNoticesList: React.FC = () => {
  const emergencyNotices = useContext(EmergencyNoticesContext);

  const arrangeNoticesByDate = () => {
    const newArray = emergencyNotices.slice(); // Create a copy of the array using slice()
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

  const renderEmergencyNotices = () => {
    return sortedNotices.map((notice: any) => {
      console.log('notice: ', notice);
      const dateTime = getReadableDate(notice.dateAdded);
      return (
        <div
          style={{ marginTop: '40px' }}
          key={notice ? notice.dateAdded : '1'}
        >
          <p>
            {notice.emergencyNotice
              ? notice.emergencyNotice.title
              : 'Loading...'}
          </p>
          <p>
            {notice.emergencyNotice
              ? notice.emergencyNotice.details
              : 'Loading'}
          </p>
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

  return <div>{renderEmergencyNotices()}</div>;
};

export default EmergencyNoticesList;
