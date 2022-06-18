import http from 'http';
import { BASE_URL } from '../constants/constants';
import { userController } from '../controllers/user.controller';

const app = (req: http.IncomingMessage, res: http.ServerResponse): void => {
  const url = req.url;
  const method = req.method;

  if (url === BASE_URL && method === 'GET') {
    userController.getAllUsers(res);
  }
};

export { app };