import { keys } from '../../data/keys';

export const encryptPasswordAPI = async (password: string) => {
  const response = await fetch(
    'https://8gqn30vcs2.execute-api.us-east-1.amazonaws.com/prod/bcrypt_encrypt',
    {
      method: 'POST',
      headers: {
        'x-api-key': keys.bcryptEncryptAPI,
      },
      body: password,
    }
  );
  const data = await response.json();
  return data.message;
};

export const decryptPasswordAPI = async (
  storedPassword: string,
  passwordInput: string
) => {
  const response = await fetch(
    'https://8gqn30vcs2.execute-api.us-east-1.amazonaws.com/prod/bcrypt_decrypt',
    {
      method: 'POST',
      headers: {
        'x-api-key': keys.bcryptDecryptAPI,
      },
      body: JSON.stringify({
        storedPassword: storedPassword,
        passwordInput: passwordInput,
      }),
    }
  );
  const data = await response.json();
  return data.message;
};
