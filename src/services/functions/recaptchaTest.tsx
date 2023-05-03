import { recaptchaAPI } from '../APIs/recaptchaAPI';

export const recaptchaTest = async (token: string | null) => {
  if ((await recaptchaAPI(token)) === 'success') {
    return true;
  } else {
    return false;
  }
};
