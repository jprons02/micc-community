import { getAllItemsAPI } from '../APIs/getAllItemsAPI';
import { addUserAPI } from '../APIs/addUserAPI';
import { UserType } from '../../customTypes';
import { AddUserObjType } from '../../customTypes';
import { encryptPasswordAPI } from '../APIs/bcryptAPIs';
import { getItemByAttribute } from '../APIs/getItemByAttribute';
import { keys } from '../../data/keys';

// getLastItem finds the highest ID number in the database and returns it.
// This is used to create a new ID number for the next user dynamically.
const getLastItemId = async () => {
  const allItems: any = await getAllItemsAPI();

  let idsArray: Array<string> = [];

  allItems.map((item: any) => {
    return idsArray.push(item.id);
  });

  // Sort this array descending
  const sortedData = idsArray.sort(
    (a: string, b: string) => parseInt(b) - parseInt(a)
  );
  // Return first value which is highest and last ID.
  return sortedData[0];
};

// Issues an ID number for the new user.
const issueId = async () => {
  const allItems: any = await getAllItemsAPI();
  if (allItems.length === 0) {
    return '1';
  } else {
    const highestIdNumber = await getLastItemId();
    return (parseInt(highestIdNumber, 10) + 1).toString();
  }
};

// This function is used to check if the user exists in the database and add them if they don't.
export const addUserFunction = async (user: UserType) => {
  try {
    // Find index of the given tribalId in array. We want to compare the password and tribalId at the same index.
    const record = await getItemByAttribute('tribalId', user.tribalId);
    if ((await record.message) === 'Item not found') {
      //const highestIdNumber = await getLastItemId();
      //return 'OK';
      const addUserObj: AddUserObjType = {
        tableName: keys.userTableName,
        item: {
          id: await issueId(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          tribalId: user.tribalId,
          password: user.password,
        },
      };
      // Encrypt password before adding to database
      const hashedPassword = await encryptPasswordAPI(user.password);
      addUserObj.item.password = hashedPassword;
      return await addUserAPI(addUserObj);
    } else {
      return 'Tribal ID already exists';
    }
  } catch (error) {
    return { error };
  }
};
