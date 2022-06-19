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

  updateUser(id: string, data: IUser): Promise<IUser> {
    return new Promise((resolve) => {
      const idx = this.users.findIndex((u) => u.id === id);
      const updatedUser = {...this.users[idx], ...data};
      this.users = [
        ...this.users.slice(0, idx),
        updatedUser,
        ...this.users.slice(idx + 1),
      ];
      resolve(updatedUser);
    });
  }

  removeUser(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.users = this.users.filter((u) => u.id !== id);
      resolve();
    });
  }
}

export const userModel = new UserModel();
