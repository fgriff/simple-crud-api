import { IUser } from '../interfaces/interfaces';

class UserModel {
  constructor(private users: IUser[] = []) {}

  findAllUsers(): Promise<IUser[]> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  findUserById(id: string) {
    return new Promise((resolve) => {
      const user = this.users.find((u) => u.id === id);
      resolve(user);
    });
  }
};

export const userModel = new UserModel();
