import { keys } from '../../data/keys';
// Gets a google access token.

export const googleCalendarAuthAPI = async (): Promise<string> => {
  const serviceKey = JSON.stringify(keys.google.calendarServiceAccountKey);

  try {
    const response = await fetch(
      'https://2ayzwdhocd.execute-api.us-east-1.amazonaws.com/prod/googleCalendarPrivateAuth',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': keys.lambdaGoogleCalendarAuthAPI,
        },
        body: serviceKey,
      }
    );
    const data = await response.json();
    if (data.message !== 'Error in goolge auth.') {
      return await data.message;
    } else {
      return 'Error in goolge auth.';
    }
  } catch (error) {
    return 'Error in googleCalendarPrivateAuth';
  }
};
