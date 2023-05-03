import { useState, useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { keys } from '../data/keys';

interface GoogleRecaptchaHook {
  token: string | null;
  renderReCAPTCHA: () => JSX.Element;
}

const useGoogleRecaptcha = (): GoogleRecaptchaHook => {
  const [token, setToken] = useState<string | null>(null);

  const onVerify = useCallback(async (token: string | null) => {
    setToken(token);
  }, []);

  const style = { marginTop: '24px', marginBottom: '-10px' };

  const renderReCAPTCHA = useCallback(() => {
    return (
      <ReCAPTCHA
        style={style}
        sitekey={keys.google.recaptchaSiteKey}
        key={window.location.pathname}
        onChange={onVerify}
      />
    );
  }, [onVerify]);

  return {
    token,
    renderReCAPTCHA,
  };
};

export default useGoogleRecaptcha;
