// This will update the record. If the specified attribute does not exist, it will create it and if it does exist it will update it.
/*
Example of data to send.

{
  "table": "community_user",
  "id": "2",
  "attributeObj": {
      "name": "verificationCode",
      "value": "012345"
  }
}

*/


import { keys } from '../../data/keys';
import { updateRecordObjType } from '../../customTypes';

export const updateRecordAPI = async (updateObj: updateRecordObjType) => {
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