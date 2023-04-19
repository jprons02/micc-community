import { awsEmailServiceAPI } from '../APIs/awsEmailServiceAPI';
import { getItemByAttribute } from '../APIs/getItemByAttribute';

// Look up user input email in database
// If email is found, send email to user with link to reset password

// Send random number to database.
// Get that random number from database.
// Send that random number to email.
// Compare input to database on update password page.

export const lostPasswordFunction = async (email: string) => {
  const record: any = await getItemByAttribute('email', email);
  if ((await record.message) === 'Item not found') {
    return 'Email not found';
  } else {
    const lostPasswordCode = Math.floor(Math.random() * 1000000);
    const valuesObj = {
      email: [email],
      subject: 'Reset your password',
      message: `Click here and use code: ${lostPasswordCode} to reset your password: https://www.google.com`,
    };
    const response = await awsEmailServiceAPI(valuesObj);
    if (response === 'Email Sent') {
      return 'Success';
    } else {
      return 'Server error';
    }
  }
};
