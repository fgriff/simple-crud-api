const BASE_URL = '/api/users';
const HEADER = { 'Content-Type': 'application/json' };

const enum STATUS_CODES {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

enum SERVER_ANSWERS {
  'ID is not uuid format' = 400,
  'User not found' = 404,
}

export { BASE_URL, STATUS_CODES, HEADER, SERVER_ANSWERS };
