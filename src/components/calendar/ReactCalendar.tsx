import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../assets/styles/css/Calendar.css';

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

  // If event is all day return "date", if event has specific time return "dateTime"
  const getDateKey = (event: any) => {
    if ('date' in event.start) {
      return 'date';
    } else {
      return 'dateTime';
    }
  };

  // This is used to compare from event api
  const convertDateToString = (dateString: any) => {
    // Check if the date has time information (indicated by 'T' in the string)
    // If date is all day it does not have T, time
    const hasTimeInfo = `${dateString}`.includes('T') ? true : false;
    if (hasTimeInfo === false) {
      const [year, month, day] = dateString.split('-');
      const date = new Date(year, month - 1, day);

      const formattedDateCompare = date
        .toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })
        .replace(/,/g, '');

      const formattedDateRead = date
        .toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })
        .replace(/,/g, '');

      return {
        compare: formattedDateCompare,
        read: formattedDateRead,
      };
    } else {
      const date = new Date(dateString);

      const options1: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      };

      const options2: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      };

      const formattedDateCompare = date
        .toLocaleString('en-US', options1)
        .replace(/,/g, '');

      const formattedDateRead = date
        .toLocaleString('en-US', options2)
        .replace(/,/g, '');

      return {
        compare: formattedDateCompare,
        read: formattedDateRead,
      };
    }
  };

  // Lists all event start dates
  const getEventDates = (events: any) => {
    return events.map((event: any) => {
      return event.start[getDateKey(event)];
    });
  };

  // Returns true if passed date as an event
  const hasEvent = (events: any, dateString: any) => {
    return getEventDates(events).map((date: any) => {
      return convertDateToString(date).compare === dateString;
    });
  };

  // Get event time
  const getTime = (dateString: any) => {
    const date = new Date(dateString);

    // Extract hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Convert to 12-hour clock format and determine AM or PM
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12

    // Format the time as "hh:mm AM/PM"
    const formattedTime = `${formattedHours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;

    return formattedTime;
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
                  position: 'absolute',
                  marginLeft: '-6px',
                  marginTop: '12px',
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
    const renderContent = (event: any) => {
      const isAllDay = getDateKey(event) === 'date' ? true : false;

      const renderDay = () => {
        if (isAllDay) {
          const date = new Date(event.start[getDateKey(event)]);
          const [startYear, startMonth, startDay] =
            event.start[getDateKey(event)].split('-');
          const [endYear, endMonth, endDay] =
            event.end[getDateKey(event)].split('-');

          const daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ];
          const dayOfWeekString = daysOfWeek[date.getDay() + 1];

          const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];

          // If event is labelled All Day and it ends the next day, show ex) Wednesday August 2 and not Wednesday August 2 - Thursday August 3
          if (parseInt(startDay) + 1 === parseInt(endDay)) {
            return (
              <p style={{ marginTop: '-12px', fontSize: '12px' }}>
                {convertDateToString(event.start[getDateKey(event)]).read}
              </p>
            );
          } else {
            const displayEndDay = (parseInt(endDay) - 1).toString();
            const displayEndMonth = months[parseInt(endMonth) - 1];
            return (
              <p style={{ marginTop: '-12px', fontSize: '12px' }}>
                {convertDateToString(event.start[getDateKey(event)]).read} -{' '}
                {dayOfWeekString} {displayEndMonth} {displayEndDay}
              </p>
            );
          }
        } else {
          if (
            convertDateToString(event.start[getDateKey(event)]).read !==
            convertDateToString(event.end[getDateKey(event)]).read
          ) {
            return (
              <p style={{ marginTop: '-12px', fontSize: '12px' }}>
                {convertDateToString(event.start[getDateKey(event)]).read} -{' '}
                {convertDateToString(event.end[getDateKey(event)]).read}
              </p>
            );
          } else {
            return (
              <p style={{ marginTop: '-12px', fontSize: '12px' }}>
                {convertDateToString(event.start[getDateKey(event)]).read}
              </p>
            );
          }
        }
      };

      const renderTime = () => {
        if (isAllDay) {
          return (
            <p style={{ marginTop: '-3px', fontSize: '12px' }}>ALL DAY EVENT</p>
          );
        } else {
          return (
            <p style={{ marginTop: '-3px', fontSize: '12px' }}>
              {getTime(event.start[getDateKey(event)])} -{' '}
              {getTime(event.end[getDateKey(event)])}
            </p>
          );
        }
      };

      return (
        <div style={{ marginTop: '30px' }} key={event.id}>
          <p style={{ fontSize: '20px', textTransform: 'uppercase' }}>
            {event.summary}
          </p>
          {renderDay()}
          {renderTime()}
          <p style={{ marginTop: '24px', fontSize: '14px' }}>
            {event.description}
          </p>
        </div>
      );
    };

    if (events) {
      if (events.length !== 0) {
        return events.map((event: any) => {
          const dateString = event.start[getDateKey(event)];
          if (
            convertDateToString(dateString).compare ===
            selectedDate.toDateString()
          ) {
            return renderContent(event);
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
