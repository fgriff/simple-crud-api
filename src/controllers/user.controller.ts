import http from 'http';
import { HEADER, SERVER_ANSWERS, STATUS_CODES } from '../constants/constants';
import { isUuidValid } from '../helpers/uuid.helper';
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

  async getUserById(res: http.ServerResponse, id: string): Promise<void> {
    try {
      if (!isUuidValid(id)) {
        res.writeHead(STATUS_CODES.BAD_REQUEST, HEADER);
        res.end(JSON.stringify({ message: SERVER_ANSWERS[STATUS_CODES.BAD_REQUEST] }));
      }

      const user = await userModel.findUserById(id);

      if (!user) {
        res.writeHead(STATUS_CODES.NOT_FOUND, HEADER);
        res.end(JSON.stringify({ message: SERVER_ANSWERS[STATUS_CODES.NOT_FOUND] }));
      } else {
        res.writeHead(STATUS_CODES.OK, HEADER);
        res.end(JSON.stringify(user));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export const userController = new UserController();
