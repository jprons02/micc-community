import { keys } from '../../data/keys';
import { AddEmergencyNoticeObjType } from '../../customTypes';

export const addEmergencyNoticeAPI = async (
  AddEmergencyNoticeObj: AddEmergencyNoticeObjType
) => {
  const response = await fetch(
    'https://p70xq17396.execute-api.us-east-1.amazonaws.com/prod/DynamoDB/add-item',
    {
      method: 'POST',
      headers: {
        'x-api-key': keys.dynamoAPI,
      },
      body: JSON.stringify(AddEmergencyNoticeObj),
    }
  );
  const data = await response.json();
  return data.message;
};
