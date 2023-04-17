import { getAllItemsAPI } from '../APIs/getAllItemsAPI';
import { compareHashedPasswords } from './compareHashedPasswords';

// This function is used to check if the user exists in the database and if the password is correct
// If the user exists and the password in that same index is correct, return "Success"

export const logInFunction = async (formInput: any) => {
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

    const dbPassword = allItems[findIndex(formInput)].password;
    const dbTribalId = allItems[findIndex(formInput)].tribalId;
    const passwordMatch = await compareHashedPasswords(
      dbPassword,
      formInput.password
    );

    if (findIndex(formInput) === -1) {
      return 'Email not found';
    } else if (passwordMatch !== 'match') {
      return 'Incorrect password';
    } else if (dbTribalId !== formInput.tribalId) {
      return 'Incorrect tribalId';
    } else {
      return 'Success';
    }
  } catch (error) {
    return { error };
  }
};
