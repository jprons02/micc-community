// Component that accepts an event prop and renders event details

import React from 'react';

// custom functions
import {
  getDateKey,
  convertDateToString,
  getTime,
} from './calendarHelperFunctions';

interface EventDetailsProps {
  event: any;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
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
    <div style={{ marginTop: '30px' }}>
      <p style={{ fontSize: '20px', textTransform: 'uppercase' }}>
        {event.summary}
      </p>
      {renderDay()}
      {renderTime()}
      <p style={{ marginTop: '24px', fontSize: '14px' }}>{event.description}</p>
    </div>
  );
};

export default EventDetails;
