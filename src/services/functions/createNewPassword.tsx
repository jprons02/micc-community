import { getItemByAttribute } from '../APIs/getItemByAttribute';
import { updateUserAPI } from '../APIs/updateUserAPI';
import { keys } from '../../data/keys';
import { encryptPasswordAPI } from '../APIs/bcryptAPIs';
import { removeAttributeFromUserAPI } from '../APIs/removeAttributeFromUserAPI';

// THE LINK FROM THE EMAIL SHOULD HAVE THE USER ID AND PASSCODE FROM THE EMAIL.
// Once you click the email get user by id and make sure the passcode matches the one in the email.
// If it does, then update the password to the new password
const removePasswordCode = async (id: string) => {
  const removeAttributeObj = {
    table: keys.userTableName,
    id: id,
    attributeName: 'lostPasswordCode',
  };
  const removeResponse = await removeAttributeFromUserAPI(removeAttributeObj);
  return removeResponse;
};

export const createNewPassword = async (id: string, newPassword: string) => {
  const password = await encryptPasswordAPI(newPassword);
  const updateObj = {
    table: keys.userTableName,
    id: id,
    attributeObj: {
      name: 'password',
      value: password,
    },
  };
  const updateResponse = await updateUserAPI(updateObj);

  // Remove the lostPasswordCode from the database once used.
  if (updateResponse === 'Item updated') {
    if ((await removePasswordCode(updateObj.id)) === 'Attribute removed') {
      return 'Item updated';
    } else {
      return 'Server error';
    }
  } else {
    return 'Server error';
  }
};
