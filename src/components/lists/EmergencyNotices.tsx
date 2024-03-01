import React, { useContext } from 'react';

// custom components
import HorizontalRule from '../dividers/HorizontalRule';

// context
import { EmergencyNoticesContext } from '../../context/emergencyNotices';

const EmergencyNoticesList: React.FC = () => {
  const emergencyNotices = useContext(EmergencyNoticesContext);

  const emergencyNoticesExist = () => {
    if (!emergencyNotices || emergencyNotices.length === 0) return false;
    return true;
  };

  const sortedNotices = () => {
    if (emergencyNoticesExist()) {
      const newArray = emergencyNotices.slice(); // Create a copy of the array using slice()
      newArray.sort(
        (a: any, b: any) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
      return newArray; // Return the sorted array
    }
    return false;
  };

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
    if (!sortedNotices())
      return <p style={{ marginTop: '30px' }}>No emergencies listed.</p>;

    return sortedNotices().map((notice: any) => {
      const dateTime = getReadableDate(notice.dateAdded);
      const resourceLinksArray = () => {
        if (notice.emergencyNotice && notice.emergencyNotice.resourceLinks) {
          return notice.emergencyNotice.resourceLinks.map((link: string) => {
            return (
              <React.Fragment key={link}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
                <br />
              </React.Fragment>
            );
          });
        }
      };
      const renderResourceLinks = () => {
        if (notice.emergencyNotice.hasOwnProperty('resourceLinks')) {
          return (
            <p style={{ fontSize: '14px', marginBottom: '30px' }}>
              {notice.emergencyNotice ? resourceLinksArray() : 'Loading'}
            </p>
          );
        } else {
          return '';
        }
      };

      return (
        <div style={{ marginTop: '40px' }} key={notice.id || 'defaultKey'}>
          <p style={{ fontSize: '20px' }}>
            {notice.emergencyNotice
              ? notice.emergencyNotice.title
              : 'Loading...'}
          </p>
          <p>
            {notice.emergencyNotice
              ? notice.emergencyNotice.details
              : 'Loading'}
          </p>
          {renderResourceLinks()}
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
          {/* if sortedNotices has length longer than 1 then dont use HorizontalRule and don't use HorizontalRule on the last mapped item*/}
          {sortedNotices.length > 1 &&
            sortedNotices().indexOf(notice) !== sortedNotices().length - 1 && (
              <HorizontalRule />
            )}
        </div>
      );
    });
  };

  return (
    <div style={{ paddingBottom: '40px' }}>{renderEmergencyNotices()}</div>
  );
};

export default EmergencyNoticesList;
