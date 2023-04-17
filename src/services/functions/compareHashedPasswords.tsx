import { decryptPasswordAPI } from '../APIs/bcryptAPIs';

export const compareHashedPasswords = async (
  storedPassword: string,
  passwordInput: string
) => {
  try {
    const response = await decryptPasswordAPI(storedPassword, passwordInput);
    return response;
  } catch (error) {
    return { error };
  }
};
