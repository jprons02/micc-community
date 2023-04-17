import { keys } from '../../data/keys';
import { User } from '../../customTypes';

export const addUserAPI = async (user: User) => {
  const response = await fetch(
    'https://glnx22k7cf.execute-api.us-east-1.amazonaws.com/Prod/add-user',
    {
      method: 'POST',
      headers: {
        'x-api-key': keys.dynamoLambdaAPI,
      },
      body: JSON.stringify(user),
    }
  );
  const data = await response.json();
  if (data.message === 'success') {
    return 'success';
  } else {
    return 'error';
  }
};
