import http from 'http';
import { app } from '../src/app/app';
import supertest from 'supertest';
import { BASE_URL } from '../src/constants/constants';

describe('Scenario-one', () => {
  const PORT = process.env.PORT || 5000;
  let server: http.Server;
  let req: supertest.SuperTest<supertest.Test>;
  let id: string;
  const testUser = {
    username: 'John',
    age: 30,
    hobbies: "['React', 'Node.js']",
  };
  const updatedData = {
    age: 31,
  };

  server = http.createServer(app);
  server.listen(PORT);
  req = supertest(`localhost:${PORT}`);

  afterAll(() => server.close());

  it('Get all user', async () => {
    // Should get an empty array and status code 200

    const res = await req.get(`${BASE_URL}`);

    expect(res.body).toEqual([]);
    expect(res.status).toBe(200);
  });

  it('Create new user', async () => {
    // Should get created user and status code 201

    const res = await req.post(`${BASE_URL}`).send(testUser);

    id = res.body.id;
    const createdUser = { id, ...testUser };

    expect(res.body).toEqual(createdUser);
    expect(res.status).toBe(201);
  });

  it('Get the user', async () => {
    //Should get the user and status code 200

    const res = await req.get(`${BASE_URL}/${id}`);

    expect(res.body).toEqual({ id, ...testUser });
    expect(res.status).toBe(200);
  });

  it('Update the user', async () => {
    //Should get the updated user and status code 200

    const res = await req.put(`${BASE_URL}/${id}`).send(updatedData);

    expect(res.body).toEqual({ id, ...testUser, ...updatedData });
    expect(res.status).toBe(200);
  });

  it('Delete the user', async () => {
    //Should get status code 204 without body

    const res = await req.del(`${BASE_URL}/${id}`);

    expect(res.status).toBe(204);
  });

  it('Get deleted user', async () => {
    //Should get status code 404 and 'User not found' message

    const res = await req.get(`${BASE_URL}/${id}`);

    expect(res.body.message).toEqual('User not found');
    expect(res.status).toBe(404);
  });
});
