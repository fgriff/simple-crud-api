import { IUser } from '../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

class UserModel {
  constructor(private users: IUser[] = []) {}

  findAllUsers(): Promise<IUser[]> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  findUserById(id: string): Promise<IUser | undefined> {
    return new Promise((resolve) => {
      const user = this.users.find((u) => u.id === id);
      resolve(user);
    });
  }

  createUser(data: IUser): Promise<IUser> {
    return new Promise((resolve) => {
      const newUser = { id: uuidv4(), ...data };
      this.users = [...this.users, newUser];
      resolve(newUser);
    });
  }
}

export const userModel = new UserModel();
