import React, { useEffect, useState } from 'react';
import { googleCalendarAuthAPI } from '../services/APIs/googleCalendarAuth';
import ReactCalendar from '../components/calendar/ReactCalendar';

const Calendar: React.FC = () => {
  /*
  useEffect(() => {
    getToken();
  }, []);

  const [token, setToken] = useState('');

  const getToken = async () => {
    setToken(await googleCalendarAuthAPI());
  };
  */

  return (
    <div style={{ padding: '20px' }}>
      {/*<GoogleCalendar token={token} />*/}
      <ReactCalendar />
    </div>
  );
};

export default Calendar;

//<GoogleCalendar token={token} />
