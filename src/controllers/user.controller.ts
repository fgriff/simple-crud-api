import http from 'http';
import { HEADER, STATUS_CODES } from '../constants/constants';
import { userModel } from '../models/user.model';

class UserController {
  async getAllUsers(res: http.ServerResponse): Promise<void> {
    try {
      const users = await userModel.findAllUsers();

      res.writeHead(STATUS_CODES.OK, HEADER);
      res.end(JSON.stringify(users));
    } catch (e) {
      console.log(e);
    }
  }
}

export const userController = new UserController();
