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
