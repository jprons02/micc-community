/*
import { keys } from '../../data/keys';
// Returns a single item based on the attribute name and value

export const getItemByAttribute = async (
  attributeName: string,
  attributeValue: string
) => {
  const response = await fetch(
    `https://p70xq17396.execute-api.us-east-1.amazonaws.com/prod/DynamoDB/get-item-by-attribute/?TableName=${keys.userTableName}&AttributeName=${attributeName}&AttributeValue=${attributeValue}`,
    {
      method: 'GET',
      headers: {
        'x-api-key': keys.dynamoAPI,
      },
    }
  );
  const data = await response.json();
  return data;
};
*/

import { keys } from '../../data/keys';
// Returns a single item based on the attribute name and value

export const getItemByAttribute = async (
  tableName: string,
  attributeName: string,
  attributeValue: string
) => {
  const response = await fetch(
    `https://p70xq17396.execute-api.us-east-1.amazonaws.com/prod/DynamoDB/get-item-by-attribute/?TableName=${tableName}&AttributeName=${attributeName}&AttributeValue=${attributeValue}`,
    {
      method: 'GET',
      headers: {
        'x-api-key': keys.dynamoAPI,
      },
    }
  );
  const data = await response.json();
  return data;
};
