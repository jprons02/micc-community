import React, { useContext, useState, useEffect } from 'react';
import { useSnackbar } from '../../lib/notistack';
//keys
import { keys } from '../../data/keys';
// functions
import { deleteAttributeFromRecord } from '../../services/functions/deleteAttributeFromRecord';

// material-ui
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// custom components
import HorizontalRule from '../dividers/HorizontalRule';

// context
import { EmergencyNoticesContext } from '../../context/emergencyNotices';
import { UserContext } from '../../context/userContext';

const EmergencyNoticesList: React.FC = () => {
  const user = useContext(UserContext);
  const isAdmin = () => {
    if (user.type) {
      if (user.type === 'admin') {
        return true;
      }
    }
    return false;
  };

  const emergencyNotices = useContext(EmergencyNoticesContext);

  const [emergencyNoticesState, setEmergencyNoticesState] = useState<
    any[] | false
  >([]);

  // Sorts and sets notices state on load.
  useEffect(() => {
    sortedNotices();
  }, [emergencyNotices]);

  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  // variant could be success, error, warning, info, or default
  // example use) enqueueSnackbar("Form submitted successfully!", { variant: "success" });
  const { enqueueSnackbar } = useSnackbar();

  const emergencyNoticesExist = () => {
    if (!emergencyNotices || emergencyNotices.length === 0) return false;
    return true;
  };

  const sortedNotices = (): any[] | false => {
    if (emergencyNoticesExist()) {
      const filteredArray = emergencyNotices.filter(
        (notice: any) => notice.emergencyNotice !== null
      );
      const newArray = [...filteredArray];
      newArray.sort(
        (a: any, b: any) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
      setEmergencyNoticesState(newArray);
    }
    return false;
  };

  const deleteNotice = async (id: string) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [id]: true, // Set loading state to true for the specific button being clicked
    }));

    const response = await deleteAttributeFromRecord(
      keys.webTableName,
      id,
      'emergencyNotice'
    );

    if (response === 'Item attribute deleted') {
      enqueueSnackbar('Notice successfully deleted.', {
        variant: 'success',
      });

      // Update the notices state by filtering out the deleted notice
      setEmergencyNoticesState((prevNotices) =>
        Array.isArray(prevNotices)
          ? prevNotices.filter(
              (emergencyNoticesState: any) => emergencyNoticesState.id !== id
            )
          : []
      );
    } else {
      enqueueSnackbar('Server error, please try again.', {
        variant: 'error',
      });
    }

    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [id]: false, // Set loading state back to false after the action is complete
    }));
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

  const renderDeleteButton = (id: string) => {
    // if user is admin, show delete button
    if (!isAdmin()) return null;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          onClick={() => deleteNotice(id)}
          variant="contained"
          disabled={loadingStates[id]}
          sx={{ mt: 3, mb: 2, position: 'relative' }} // Add position: relative to the button
        >
          <span style={loadingStates[id] ? { visibility: 'hidden' } : {}}>
            Delete Notice
          </span>
          {loadingStates[id] && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)', // Center the spinner
              }}
            />
          )}
        </Button>
      </div>
    );
  };

  const renderEmergencyNotices = () => {
    if (
      !emergencyNoticesState ||
      !Array.isArray(emergencyNoticesState) ||
      emergencyNoticesState.length === 0
    )
      return <p style={{ marginTop: '30px' }}>No emergencies listed.</p>;

    return emergencyNoticesState.map((notice: any, index: number) => {
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
        return null;
      };
      const renderResourceLinks = () => {
        if (
          notice.emergencyNotice &&
          notice.emergencyNotice.resourceLinks[0] !== ''
        ) {
          return (
            <p style={{ fontSize: '14px', marginBottom: '30px' }}>
              {notice.emergencyNotice ? resourceLinksArray() : 'Loading'}
            </p>
          );
        }
        return null;
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
          {renderDeleteButton(notice.id)}
          {Array.isArray(emergencyNoticesState) &&
            emergencyNoticesState.length > 1 &&
            index !== emergencyNoticesState.length - 1 && <HorizontalRule />}
        </div>
      );
    });
  };

  return (
    <div style={{ paddingBottom: '40px' }}>{renderEmergencyNotices()}</div>
  );
};

export default EmergencyNoticesList;
