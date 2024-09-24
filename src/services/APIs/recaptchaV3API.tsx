import { keys } from "../../data/keys";

export const recaptchaV3API = async (recaptchaToken: string | null) => {
  const dataString = JSON.stringify({
    recaptchaToken: recaptchaToken,
    secretKey: keys.google.recaptchaV3SecretKey,
  });

  try {
    const response = await fetch(
      "https://2hl09omy22.execute-api.us-east-1.amazonaws.com/prod/RecaptchaV3",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": keys.lambdaRecaptchaAPI,
        },
        body: dataString,
      }
    );
    const data = await response.json();
    const returnData = JSON.parse(data.body);
    return returnData.success;
  } catch (error) {
    console.log("error: ", error);
  }
};
