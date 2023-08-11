import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../assets/styles/css/Calendar.css';

// custom component
import EventDetails from './EventDetails';

// custom function
import {
  getDateKey,
  convertDateToString,
  hasEvent,
} from './calendarHelperFunctions';

// Material UI
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface Props {
  events: any;
}

const CustomCalendar: React.FC<Props> = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  // If there is an event on the date tile, add a dot.
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      if (events) {
        if (events.length !== 0) {
          const dateString = date.toDateString();
          const eventDates = hasEvent(events, dateString);

          // Check if any eventDates is true
          if (eventDates.includes(true)) {
            return (
              <span
                style={{
                  display: 'block',
                  marginBottom: '-16px',
                }}
              >
                &#8226;
              </span>
            );
          }
        }
      }
    }
    return null;
  };

  // If there is event on date selected, append details below.
  const renderEventDetails = () => {
    if (events) {
      if (events.length !== 0) {
        return events.map((event: any) => {
          const dateString = event.start[getDateKey(event)];
          if (
            convertDateToString(dateString).compare ===
            selectedDate.toDateString()
          ) {
            return (
              <div key={event.id}>
                <EventDetails event={event} />
              </div>
            );
          } else {
            return '';
          }
        });
      } else {
        return '';
      }
    }
  };

  return (
    <div className={'custom-calendar'}>
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        tileContent={tileContent}
      />
      {/* Display the events for the selected date */}
      {renderEventDetails()}
    </div>
  );
};

export default CustomCalendar;
