import { keys } from '../../data/keys';
// Returns an array of all items, will paginate (done in backend) if needed

export const getAllItemsAPI = async () => {
  const response = await fetch(
    `https://p70xq17396.execute-api.us-east-1.amazonaws.com/prod/DynamoDB/get-all-items/?TableName=${keys.userTableName}`,
    {
      method: 'GET',
      headers: {
        'x-api-key': keys.dynamoAPI,
      },
    }
  );
  const data = await response.json();
  return data.items;
};
