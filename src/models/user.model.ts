import { IUser } from '../interfaces/interfaces';

class UserModel {
  constructor(private users: IUser[] = []) {}

  findAllUsers(): Promise<IUser[]> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }
};

export const userModel = new UserModel();
