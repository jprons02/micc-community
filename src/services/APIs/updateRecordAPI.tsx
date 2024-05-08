// This will update the record. If the specified attribute does not exist, it will create it and if it does exist it will update it.

import { keys } from '../../data/keys';
import { updateUserObjType } from '../../customTypes';

export const updateRecordAPI = async (updateObj: updateUserObjType) => {
  // Send a PUT request
  const response = await fetch(
    'https://p70xq17396.execute-api.us-east-1.amazonaws.com/prod/DynamoDB/update-item',
    {
      method: 'PUT',
      headers: {
        'x-api-key': keys.dynamoAPI,
      },
      body: JSON.stringify(updateObj),
    }
  );
  const data = await response.json();
  return data.message;
};
