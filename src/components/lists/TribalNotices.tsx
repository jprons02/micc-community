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
import { TribalNoticesContext } from '../../context/tribalNotices';
import { UserContext } from '../../context/userContext';

const TribalNoticesList: React.FC = () => {
  const user = useContext(UserContext);
  const isAdmin = () => {
    if (user.type) {
      if (user.type === 'admin') {
        return true;
      }
    }
    return false;
  };
  const tribalNotices = useContext(TribalNoticesContext);
  const [tribalNoticesState, setTribalNoticesState] = useState<any[] | false>(
    []
  );
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  // variant could be success, error, warning, info, or default
  // example use) enqueueSnackbar("Form submitted successfully!", { variant: "success" });
  const { enqueueSnackbar } = useSnackbar();

  // Sets notices state on load.
  useEffect(() => {
    arrangeNoticesByDate();
  }, [tribalNotices]);

  const arrangeNoticesByDate = () => {
    const newArray = tribalNotices.slice(); // Create a copy of the array using slice()
    newArray.sort(
      (a: any, b: any) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );

    // Filter array that only shows records with "tribalNotice" keys that are not falsey.
    const filteredArray = newArray.filter((item: any) => {
      if (item.hasOwnProperty('tribalNotice')) {
        if (item.tribalNotice !== null && item.tribalNotice !== '') {
          return true; // Include the item in the filtered array
        }
      }
      return false; // Exclude the item from the filtered array
    });

    setTribalNoticesState(filteredArray); // Return the sorted array
  };

  const deleteNotice = async (id: string) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [id]: true, // Set loading state to true for the specific button being clicked
    }));

    const response = await deleteAttributeFromRecord(
      keys.webTableName,
      id,
      'tribalNotice'
    );

    if (response === 'Item attribute deleted') {
      enqueueSnackbar('Notice successfully deleted.', {
        variant: 'success',
      });

      // Update the notices state by filtering out the deleted notice
      setTribalNoticesState((prevNotices) =>
        Array.isArray(prevNotices)
          ? prevNotices.filter(
              (tribalNoticesState: any) => tribalNoticesState.id !== id
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

  //const sortedNotices = arrangeNoticesByDate();

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

  const renderTribalNotices = () => {
    if (!tribalNoticesState || tribalNoticesState.length === 0)
      return <p style={{ marginTop: '30px' }}>No emergencies listed.</p>;
    return !tribalNoticesState
      ? null
      : tribalNoticesState.map((notice: any, index: number) => {
          const dateTime = getReadableDate(notice.dateAdded);
          if (notice.tribalNotice === '' || notice.tribalNotice === null) {
            return null;
          } else {
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
                {renderDeleteButton(notice.id)}
                {Array.isArray(tribalNoticesState) &&
                  tribalNoticesState.length > 1 &&
                  index !== tribalNoticesState.length - 1 && <HorizontalRule />}
              </div>
            );
          }
        });
  };

  return <div style={{ paddingBottom: '40px' }}>{renderTribalNotices()}</div>;
};

export default TribalNoticesList;
