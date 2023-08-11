import { compareHashedPasswords } from './compareHashedPasswords';
import { LoginFormType } from '../../customTypes';
import { getItemByAttribute } from '../APIs/getItemByAttribute';
import { keys } from '../../data/keys';

// This function is used to check if the user exists in the database
// Then compare hashed password with input password for a match
// If the user exists and the password in that same index is correct, return "Success"

export const logInFunction = async (formInput: LoginFormType) => {
  try {
    // Find index of the given email in array. We want to compare the password and tribalId at the same index.
    // "record" argument must remain type "any" because it may be ever changing.
    const record: any = await getItemByAttribute(
      keys.userTableName,
      'email',
      formInput.email
    );

    const response = {
      message: '',
      data: {},
    };

    if ((await record.message) === 'Item not found') {
      response.message = 'Email not found';
      return response;
    } else {
      const dbPassword = await record.password;
      const dbTribalId = await record.tribalId;
      const passwordMatch = await compareHashedPasswords(
        dbPassword,
        formInput.password
      );
      if (passwordMatch === 'Internal Server Error') {
        response.message = 'Internal Server Error';
        return response;
      } else if (passwordMatch !== 'match') {
        response.message = 'Incorrect password';
        return response;
      } else if (dbTribalId !== formInput.tribalId) {
        response.message = 'Incorrect tribalId';
        return response;
      } else {
        response.message = 'Success';
        response.data = record;
        return response;
      }
    }
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
};
