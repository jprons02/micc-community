import { keys } from '../../data/keys';
import { AddTribalNoticeObjType } from '../../customTypes';

export const addTribalNoticeAPI = async (
  AddTribalNoticeObj: AddTribalNoticeObjType
) => {
  const response = await fetch(
    'https://p70xq17396.execute-api.us-east-1.amazonaws.com/prod/DynamoDB/add-item',
    {
      method: 'POST',
      headers: {
        'x-api-key': keys.dynamoAPI,
      },
      body: JSON.stringify(AddTribalNoticeObj),
    }
  );
  const data = await response.json();
  return data.message;
};
