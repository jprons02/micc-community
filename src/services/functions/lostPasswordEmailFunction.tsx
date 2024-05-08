import { awsEmailServiceAPI } from '../APIs/awsEmailServiceAPI';
import { getItemByAttribute } from '../APIs/getItemByAttribute';
import { updateRecordAPI } from '../APIs/updateRecordAPI';
import { keys } from '../../data/keys';

// Look up user input email in database
// If email is found, send email to user with link to reset password

// Send random number to database.
// Get that random number from database.
// Send that database random number to email.
// Compare input to database on update password page.

// Generate random number for lostpassword code and store it in database
const generateAndStoreLostPasswordCode = async (record: any) => {
  const lostPasswordCode = Math.floor(Math.random() * 1000000);
  const updateObj = {
    table: keys.userTableName,
    id: record.id,
    attributeObj: {
      name: 'lostPasswordCode',
      value: lostPasswordCode.toString(),
    },
  };
  const updateResponse = await updateRecordAPI(updateObj);
  return updateResponse;
};

// Get the update record with the lostPasswordCode from the database
const getRecordWithLostPasswordCode = async (record: any) => {
  const recordWithLostPasswordCode: any = await getItemByAttribute(
    keys.userTableName,
    'email',
    record.email
  );
  return recordWithLostPasswordCode;
};

// Send email to user with link and password code to reset password
const sendEmailWithLostPasswordCode = async (record: any) => {
  const valuesObj = {
    email: [record.email],
    subject: 'Miccosukee Community Website - Please reset your password',
    //message: `Click here to reset your password: localhost:3000/resetpassword/${record.id}/${record.lostPasswordCode}`,
    message: `Click here to reset your password: https://www.miccosukee.community/resetpassword/${record.id}/${record.lostPasswordCode}`,
  };
  const response = await awsEmailServiceAPI(valuesObj);
  if (response === 'Email Sent') {
    return 'Success';
  } else {
    return 'Server error';
  }
};

export const lostPasswordEmailFunction = async (email: string) => {
  const record: any = await getItemByAttribute(
    keys.userTableName,
    'email',
    email
  );
  if ((await record.message) === 'Item not found') {
    return 'Email not found';
  } else {
    // Generate random number for lostpassword code and store it in database
    if ((await generateAndStoreLostPasswordCode(record)) === 'Item updated') {
      // Get the update record with the lostPasswordCode from the database
      const updatedRecord = await getRecordWithLostPasswordCode(record);
      // Send email to user with link and password code to reset password
      if ((await sendEmailWithLostPasswordCode(updatedRecord)) === 'Success') {
        return 'Success';
      } else {
        return 'Error sending email';
      }
    } else {
      return 'Error storing lost password code';
    }
  }
};
