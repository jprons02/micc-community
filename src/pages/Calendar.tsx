import React, { useState, useContext } from 'react';
import ReactCalendar from '../components/calendar/ReactCalendar';
import { CalendarEventsContext } from '../context/calendarEvents';

// Material UI
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import EventDetails from '../components/calendar/EventDetails';

const Calendar: React.FC = () => {
  const events = useContext(CalendarEventsContext);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const [isCalendarView, setCalendarView] = useState(true);

  const handleClick = (state: boolean) => {
    setCalendarView(state);
  };

  const buttonStyle = {
    marginRight: '10px',
  };

  const renderEventListView = () => {
    return events.map((event: any) => {
      return (
        <div key={event.id}>
          <EventDetails event={event} />
        </div>
      );
    });
  };

  // THIS MAX WIDTH MATCHES CALENDAR MAX WIDTH
  return (
    <div style={{ maxWidth: '700px' }}>
      <h3 style={!isDesktop ? { fontSize: '20px' } : {}}>EVENTS</h3>
      <div style={{ marginBottom: '10px' }}>
        <Button
          onClick={() => handleClick(true)}
          style={buttonStyle}
          variant={isCalendarView ? 'contained' : 'outlined'}
        >
          Calendar View
        </Button>
        <Button
          onClick={() => handleClick(false)}
          style={buttonStyle}
          variant={!isCalendarView ? 'contained' : 'outlined'}
        >
          List View
        </Button>
      </div>
      <div style={{ marginTop: '40px' }}></div>
      {isCalendarView ? (
        <ReactCalendar events={events} />
      ) : (
        renderEventListView()
      )}
    </div>
  );
};

export default Calendar;
