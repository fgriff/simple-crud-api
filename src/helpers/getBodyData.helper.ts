import http from 'http';
import { HEADER, STATUS_CODES } from '../constants/constants';
import { IUser } from '../interfaces/interfaces';

const getBodyData = (req: http.IncomingMessage, res: http.ServerResponse): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => (body += chunk.toString()));
      req.on('end', () => resolve(body));
    } catch (err) {
      res.writeHead(STATUS_CODES.INTERNAL_SERVER_ERROR, HEADER);
      res.end(JSON.stringify({ message: 'Something went wrong' }));
      reject(err);
    }
  });
};

const isBodyValid = (body: string): boolean => {
  const requiredFields = ['username', 'age', 'hobbies'];
  let result = true;

  try {
    const transformedBody = JSON.parse(body) as IUser;

    requiredFields.forEach((f) => {
      if (!(f in transformedBody)) {
        result = false;
      }
    });
  } catch (e) {
    throw new Error('Incorrect JSON format');
  }

  return result;
};

export { getBodyData, isBodyValid };
