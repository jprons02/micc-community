import { updateRecordAPI } from '../APIs/updateRecordAPI';
import { keys } from '../../data/keys';

// Simple delete attribute from record. This updates the record attribute to empty string.

export const deleteAttributeFromRecord = async (
  table: string,
  id: string,
  attributeName: string
) => {
  const updateObj = {
    table: table,
    id: id,
    attributeObj: {
      name: attributeName,
      value: null,
    },
  };

  const updateResponse = await updateRecordAPI(updateObj);
  if (updateResponse === 'Item updated') {
    return 'Item attribute deleted';
  } else {
    return 'Server error';
  }
};
