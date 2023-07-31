import { keys } from '../../data/keys';
//https://www.google.com/u/2/recaptcha/admin/site/635130373/settings

export const recaptchaAPI = async (clientResponse: string | null) => {
  const dataString = JSON.stringify({
    clientResponse: clientResponse,
    secretKey: keys.google.recaptchaSecretKey,
  });

  try {
    const response = await fetch(
      'https://2hl09omy22.execute-api.us-east-1.amazonaws.com/prod',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': keys.lambdaRecaptchaAPI,
        },
        body: dataString,
      }
    );
    const data = await response.json();
    if (data.success != true) {
      return 'fail';
    } else {
      return 'success';
    }
  } catch (error) {
    console.log('error: ', error);
  }
};
