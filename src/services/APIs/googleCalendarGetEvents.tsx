import { keys } from '../../data/keys';

export const googleCalendarGetEventsAPI = async () => {
  const serviceKey = JSON.stringify(keys.google.calendarServiceAccountKey);

  try {
    const response = await fetch(
      'https://hzqen5ppl3.execute-api.us-east-1.amazonaws.com/prod/googleCalendarGetEvents',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': keys.lambdaGoogleCalendarGetEventsAPI,
        },
        body: serviceKey,
      }
    );
    const data = await response.json();
    console.log('data from get events front end: ', data.events);
    if (data.message !== 'An error occurred while retrieving events.') {
      return data.events;
    } else {
      return 'Error in goolge get events api.';
    }
  } catch (error) {
    console.log('error: ', error);
  }
};
