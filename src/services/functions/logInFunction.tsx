import { getAllItemsAPI } from '../APIs/getAllItemsAPI';

// This function is used to check if the user exists in the database and if the password is correct
// If the user exists and the password in that same index is correct, return "Success"

export const logInFunction = async (record: any) => {
  try {
    const allItems = await getAllItemsAPI();
    // Find index of the given email in array. We want to compare the password and tribalId at the same index.
    const findIndex = (element: any) => {
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].email === element.email) {
          return i;
        }
      }
      return -1; // Return -1 if element not found
    };

    if (findIndex(record) === -1) {
      return 'Email not found';
    } else if (allItems[findIndex(record)].password !== record.password) {
      return 'Incorrect password';
    } else if (allItems[findIndex(record)].tribalId !== record.tribalId) {
      return 'Incorrect tribalId';
    } else {
      return 'Success';
    }
  } catch (error) {
    return { error };
  }
};
