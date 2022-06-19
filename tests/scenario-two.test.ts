import http from 'http';
import { app } from '../src/app/app';
import supertest from 'supertest';
import { BASE_URL } from '../src/constants/constants';

describe('Scenario-two', () => {
  const PORT = process.env.PORT || 5000;
  let server: http.Server;
  let req: supertest.SuperTest<supertest.Test>;
  const invalidId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
  const correctId = 'a90a5f8f-c982-4d46-b41d-6fbf4cfb1631';
  const invalidTestUser = {
    age: 25,
  };

  server = http.createServer(app);
  server.listen(PORT);
  req = supertest(`localhost:${PORT}`);

  afterAll(() => server.close());

  it('Try to get user with invalid id', async () => {
    //Should get status code 400 and 'ID is not uuid format' message

    const res = await req.get(`${BASE_URL}/${invalidId}`);

    expect(res.body.message).toEqual('ID is not uuid format');
    expect(res.status).toBe(400);
  });

  it('Try to get user with invalid route', async () => {
    //Should get status code 404 and 'Route not found' message

    const invalidRoute = 'address/city';

    const res = await req.get(`${BASE_URL}/${invalidRoute}`);

    expect(res.body.message).toEqual('Route not found');
    expect(res.status).toBe(404);
  });

  it('Create new user without required fields', async () => {
    //Should get status code 400 and 'Fill in all required fields' message

    const res = await req.post(`${BASE_URL}`).send(invalidTestUser);

    expect(res.body.message).toEqual('Fill in all required fields');
    expect(res.status).toBe(400);
  });

  it('Delete the user with invalid id', async () => {
    //Should get status code 400 and 'ID is not uuid format' message

    const res = await req.del(`${BASE_URL}/${invalidId}`);

    expect(res.body.message).toEqual('ID is not uuid format');
    expect(res.status).toBe(400);
  });

  it('Attempt to delete non-existent user', async () => {
    //Should get status code 404 and 'User not found' message

    const res = await req.del(`${BASE_URL}/${correctId}`);

    expect(res.body.message).toEqual('User not found');
    expect(res.status).toBe(404);
  });
});
