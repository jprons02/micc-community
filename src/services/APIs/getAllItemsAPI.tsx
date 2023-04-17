import { keys } from '../../data/keys';

export const getAllItemsAPI = async () => {
  const response = await fetch(
    'https://glnx22k7cf.execute-api.us-east-1.amazonaws.com/Prod/get-all-users',
    {
      method: 'GET',
      headers: {
        'x-api-key': keys.dynamoLambdaAPI,
      },
    }
  );
  const data = await response.json();
  return data;
};
