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

export type updateUserObjType = {
  table: string;
  id: string;
  attributeObj: {
    name: string;
    value: string;
  };
};

export type removeAttributeFromUserObjType = {
  table: string;
  id: string;
  attributeName: string;
};
