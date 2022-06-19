import http from 'http';
import { HEADER, SERVER_ANSWERS, STATUS_CODES } from '../constants/constants';
import { getBodyData, isBodyValid } from '../helpers/getBodyData.helper';
import { isUuidValid } from '../helpers/uuid.helper';
import { IUser } from '../interfaces/interfaces';
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
        res.end(
          JSON.stringify({
            message: SERVER_ANSWERS[STATUS_CODES.BAD_REQUEST],
          })
        );
      }

      const user = await userModel.findUserById(id);

      if (!user) {
        res.writeHead(STATUS_CODES.NOT_FOUND, HEADER);
        res.end(
          JSON.stringify({
            message: SERVER_ANSWERS[STATUS_CODES.NOT_FOUND],
          })
        );
      } else {
        res.writeHead(STATUS_CODES.OK, HEADER);
        res.end(JSON.stringify(user));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async createUser(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
      const body = await getBodyData(req, res);

      if (isBodyValid(body)) {
        const { username, age, hobbies } = JSON.parse(body) as IUser;

        const data = {
          username,
          age,
          hobbies,
        };

        const newUser = await userModel.createUser(data);

        res.writeHead(STATUS_CODES.CREATED, HEADER);
        res.end(JSON.stringify(newUser));
      } else {
        res.writeHead(STATUS_CODES.BAD_REQUEST, HEADER);
        res.end(JSON.stringify({ message: 'Fill in all required fields' }));
      }
    } catch (e) {
      if (e instanceof Error) {
        res.writeHead(STATUS_CODES.INTERNAL_SERVER_ERROR, HEADER);
        res.end(JSON.stringify({ message: `${e.message}` }));
      }
    }
  }

  async updateUser(req: http.IncomingMessage, res: http.ServerResponse, id: string): Promise<void> {
    try {
      if (!isUuidValid(id)) {
        res.writeHead(STATUS_CODES.BAD_REQUEST, HEADER);
        res.end(
          JSON.stringify({
            message: SERVER_ANSWERS[STATUS_CODES.BAD_REQUEST],
          })
        );
      } else {
        const user = await userModel.findUserById(id);

        if (!user) {
          res.writeHead(STATUS_CODES.NOT_FOUND, HEADER);
          res.end(
            JSON.stringify({
              message: SERVER_ANSWERS[STATUS_CODES.NOT_FOUND],
            })
          );
        } else {
          const body = await getBodyData(req, res);
          const { username, age, hobbies } = JSON.parse(body) as IUser;

          const updatedData = {
            username: username ?? user.username,
            age: age ?? user.age,
            hobbies: hobbies ?? user.hobbies,
          };

          const updatedUser = await userModel.updateUser(id, updatedData);

          res.writeHead(STATUS_CODES.OK, HEADER);
          res.end(JSON.stringify(updatedUser));
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export const userController = new UserController();
