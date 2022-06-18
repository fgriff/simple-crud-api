import http from 'http';
import { BASE_URL } from '../constants/constants';
import { userController } from '../controllers/user.controller';

const app = (req: http.IncomingMessage, res: http.ServerResponse): void => {
  const url = req.url;
  const method = req.method;
  const hasId = url && /(\w+)(-\w+)(-\w+)(-\w+)(-\w+)/.test(url);

  if (url === BASE_URL && method === 'GET') {
    userController.getAllUsers(res);
  } else if (hasId && method === 'GET') {
    const id = url?.split('/')[3] || '';
    userController.getUserById(res, id);
  }
};

export { app };
