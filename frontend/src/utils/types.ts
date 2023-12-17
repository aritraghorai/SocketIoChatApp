export type LoginFormState = {
  email: string;
  password: string;
};

export type RegisterFormState = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
};

export type Message = {
  userId: string;
  message: string;
};
