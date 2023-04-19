import { keys } from '../../data/keys';
import { sesObjType } from '../../customTypes';

export const awsEmailServiceAPI = async (valuesObj: any) => {
  // Create an object with the values to send to the API
  const valuesToSend: sesObjType = {
    toEmail: valuesObj.email,
    subject: valuesObj.subject,
    message: valuesObj.message,
  };

  // Send a POST request
  const response = await fetch(
    'https://ruka8fo9wb.execute-api.us-east-1.amazonaws.com/prod/simpleEmailAPI',
    {
      method: 'POST',
      headers: {
        'x-api-key': keys.emailLambdaAPI,
      },
      body: JSON.stringify(valuesToSend),
    }
  );
  const data = await response.json();
  return data.message;
};
