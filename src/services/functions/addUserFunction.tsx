import { getAllItemsAPI } from '../APIs/getAllItemsAPI';
import { addUserAPI } from '../APIs/addUserAPI';
import { User } from '../../customTypes';
import { encryptPasswordAPI } from '../APIs/bcryptAPIs';

// Need to look through all data for existing tribal ID.
export const addUserFunction = async (user: User) => {
  try {
    const allItems = await getAllItemsAPI();
    // Find index of the given tribalId in array. We want to compare the password and tribalId at the same index.
    const findIndex = (user: User) => {
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].tribalId === user.tribalId) {
          return i;
        }
      }
      return -1; // Return -1 if element not found
    };

    if (findIndex(user) !== -1) {
      return 'Tribal ID already exists';
    } else {
      // Encrypt password before adding to database
      const hashedPassword = await encryptPasswordAPI(user.password);
      user.password = hashedPassword;
      return await addUserAPI(user);
    }
  } catch (error) {
    return { error };
  }
};
