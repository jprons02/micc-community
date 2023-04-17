import { getAllItemsAPI } from '../APIs/getAllItemsAPI';
import { compareHashedPasswords } from './compareHashedPasswords';
import { LoginFormType } from '../../customTypes';

// This function is used to check if the user(email) exists in the database
// Then compare hashed password with input password for a match
// If the user exists and the password in that same index is correct, return "Success"

export const logInFunction = async (formInput: LoginFormType) => {
  try {
    const allItems = await getAllItemsAPI();
    // Find index of the given email in array. We want to compare the password and tribalId at the same index.
    const findIndex = (record: any) => {
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].email === record.email) {
          return i;
        }
      }
      return -1; // Return -1 if element not found
    };

    if (findIndex(formInput) === -1) {
      return 'Email not found';
    } else {
      const dbPassword = allItems[findIndex(formInput)].password;
      const dbTribalId = allItems[findIndex(formInput)].tribalId;
      const passwordMatch = await compareHashedPasswords(
        dbPassword,
        formInput.password
      );
      if (passwordMatch === 'Internal Server Error') {
        console.log('Internal Server Error');
        return 'Internal Server Error';
      } else if (passwordMatch !== 'match') {
        console.log('Incorrect password');
        return 'Incorrect password';
      } else if (dbTribalId !== formInput.tribalId) {
        console.log('Incorrect tribalId');
        return 'Incorrect tribalId';
      } else {
        console.log('Success');
        return 'Success';
      }
    }
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
};
