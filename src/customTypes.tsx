export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  tribalId: string;
  password: string;
};

export type AddUserObjType = {
  tableName: string;
  item: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    tribalId: string;
    password: string;
  };
};

export type AddTribalNoticeObjType = {
  tableName: string;
  item: {
    id: string;
    tribalNotice: string;
    name: string;
    userId: string;
    dateAdded: Date;
  };
};

export type AddEmergencyNoticeObjType = {
  tableName: string;
  item: {
    id: string;
    emergencyNotice: {
      title: string;
      details: string;
    };
    name: string;
    userId: string;
    dateAdded: Date;
  };
};

export type LoginFormType = {
  email: string;
  tribalId: string;
  password: string;
};

export type sesObjType = {
  toEmail: string[];
  subject: string;
  message: string;
};

export type updateRecordObjType = {
  table: string;
  id: string;
  attributeObj: {
    name: string;
    value: any;
  };
};

export type removeAttributeFromUserObjType = {
  table: string;
  id: string;
  attributeName: string;
};
