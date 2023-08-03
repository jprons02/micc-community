import React, { useEffect, useState } from 'react';
import { googleCalendarAuthAPI } from '../services/APIs/googleCalendarAuth';
import ReactCalendar from '../components/calendar/ReactCalendar';
import { googleCalendarGetEventsAPI } from '../services/APIs/googleCalendarGetEvents';

// Material UI
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    getGoogleCalendarEvents();
  }, []);

  const getGoogleCalendarEvents = async () => {
    setEvents(await googleCalendarGetEventsAPI());
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={!isDesktop ? { fontSize: '20px' } : {}}>
        Miccosukee Community Calendar
      </h1>
      <ReactCalendar events={events} />
    </div>
  );
};

export default Calendar;
