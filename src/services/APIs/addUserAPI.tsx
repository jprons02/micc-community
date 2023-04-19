import { keys } from '../../data/keys';
import { AddUserObjType } from '../../customTypes';

export const addUserAPI = async (AddUserObj: AddUserObjType) => {
  const response = await fetch(
    'https://p70xq17396.execute-api.us-east-1.amazonaws.com/prod/DynamoDB/add-item',
    {
      method: 'POST',
      headers: {
        'x-api-key': keys.newDynamoKey,
      },
      body: JSON.stringify(AddUserObj),
    }
  );
  const data = await response.json();
  return data.message;
};
