import { compareHashedPasswords } from './compareHashedPasswords';
import { LoginFormType } from '../../customTypes';
import { getItemByAttribute } from '../APIs/getItemByAttribute';

// This function is used to check if the user exists in the database
// Then compare hashed password with input password for a match
// If the user exists and the password in that same index is correct, return "Success"

export const logInFunction = async (formInput: LoginFormType) => {
  try {
    // Find index of the given email in array. We want to compare the password and tribalId at the same index.
    // "record" argument must remain type "any" because it may be ever changing.
    const record: any = await getItemByAttribute('email', formInput.email);

    if ((await record.message) === 'Item not found') {
      return 'Email not found';
    } else {
      const dbPassword = await record.password;
      const dbTribalId = await record.tribalId;
      const passwordMatch = await compareHashedPasswords(
        dbPassword,
        formInput.password
      );
      if (passwordMatch === 'Internal Server Error') {
        return 'Internal Server Error';
      } else if (passwordMatch !== 'match') {
        return 'Incorrect password';
      } else if (dbTribalId !== formInput.tribalId) {
        return 'Incorrect tribalId';
      } else {
        return 'Success';
      }
    }
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
};
