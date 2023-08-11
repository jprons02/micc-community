// If event is all day return "date", if event has specific time return "dateTime"
export const getDateKey = (event: any) => {
  if ('date' in event.start) {
    return 'date';
  } else {
    return 'dateTime';
  }
};

// This is used to compare from event api
export const convertDateToString = (dateString: any) => {
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
export const getEventDates = (events: any) => {
  return events.map((event: any) => {
    return event.start[getDateKey(event)];
  });
};

// Returns true if passed date as an event
export const hasEvent = (events: any, dateString: any) => {
  return getEventDates(events).map((date: any) => {
    return convertDateToString(date).compare === dateString;
  });
};

// Get event time
export const getTime = (dateString: any) => {
  const date = new Date(dateString);

  // Extract hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert to 12-hour clock format and determine AM or PM
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12

  // Format the time as "hh:mm AM/PM"
  const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${amOrPm}`;

  return formattedTime;
};
