import http from 'http';
import { BASE_URL, HEADER, STATUS_CODES } from '../constants/constants';
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
  } else {
    res.writeHead(STATUS_CODES.NOT_FOUND, HEADER);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};

export { app };
