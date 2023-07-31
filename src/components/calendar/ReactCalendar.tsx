import React, { useEffect, useState, useRef } from 'react';
import { googleCalendarGetEventsAPI } from '../../services/APIs/googleCalendarGetEvents';

// Material UI
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

//props
/*
interface GoogleCalendarProps {
  token: string;
}
*/

const ReactCalendar: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getGoogleCalendarEvents();
  }, []);

  const getGoogleCalendarEvents = async () => {
    setEvents(await googleCalendarGetEventsAPI());
  };

  return (
    <div>
      <h1>React Calendar</h1>
    </div>
  );
};

export default ReactCalendar;
