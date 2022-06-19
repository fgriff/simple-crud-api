interface IUser {
  [key: string]: string | number | string[] | [] | undefined;
  id?: string;
  username: string;
  age: number;
  hobbies: string[] | [];
};

export { IUser };