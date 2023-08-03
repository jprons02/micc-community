//Gets events from api in chunks until no more events or until 6 months from today.

import { keys } from '../../data/keys';

const fetchEventsChunk = async (
  timeMin: any,
  chunkSize: number,
  pageToken: any
) => {
  const serviceKey = JSON.stringify(keys.google.calendarServiceAccountKey);
  const response = await fetch(
    'https://hzqen5ppl3.execute-api.us-east-1.amazonaws.com/prod/googleCalendarGetEvents',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': keys.lambdaGoogleCalendarGetEventsAPI,
      },
      body: JSON.stringify({
        serviceKey,
        timeMin,
        maxResults: chunkSize,
        pageToken,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const googleCalendarGetEventsAPI = async () => {
  const chunkSize = 20;
  const today = new Date();
  let allEvents: any = [];
  let timeMin = today.toISOString();
  const timeMax = new Date(
    today.getFullYear(),
    today.getMonth() + 6,
    1
  ).toISOString();
  let pageToken = ''; // Initialize the pageToken as an empty string

  try {
    while (timeMin <= timeMax) {
      const data = await fetchEventsChunk(timeMin, chunkSize, pageToken); // Include the pageToken in the request
      const events = data.events || [];

      allEvents = allEvents.concat(events);

      // No more events or nextPageToken is not available, break the loop.
      if (events.length === 0 || !data.nextPageToken) {
        return allEvents;
      }

      // Update the pageToken for the next request
      pageToken = data.nextPageToken;

      // Get the latest event's start time
      const latestEventStartTime = new Date(
        events[events.length - 1].start.dateTime ||
          events[events.length - 1].start.date
      );

      // Set timeMin to one millisecond after the latest event's start time
      timeMin = new Date(latestEventStartTime.getTime() + 1).toISOString();

      // Move timeMin to the start of the next month
      timeMin = new Date(
        latestEventStartTime.getFullYear(),
        latestEventStartTime.getMonth() + 1,
        1
      ).toISOString();
    }

    return allEvents;
  } catch (error) {
    console.log('error: ', error);
    return 'Error in google get events api.';
  }
};
