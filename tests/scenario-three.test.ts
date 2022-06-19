import http from 'http';
import { app } from '../src/app/app';
import supertest from 'supertest';
import { BASE_URL } from '../src/constants/constants';

describe('Scenario-three', () => {
  const PORT = process.env.PORT || 5000;
  let server: http.Server;
  let req: supertest.SuperTest<supertest.Test>;
  let id1: string;
  let id2: string;
  let id3: string;
  let id4: string;
  const testUser1 = {
    username: 'John',
    age: 20,
    hobbies: "['React', 'Node.js']",
  };
  const testUser2 = {
    username: 'Mike',
    age: 19,
    hobbies: "['Angular']",
  };
  const testUser3 = {
    username: 'Alex',
    age: 22,
    hobbies: "['English', 'Java', 'Cycling']",
  };
  const extraFieldUser = {
    username: 'Steve',
    age: 31,
    hobbies: '[]',
  };

  server = http.createServer(app);
  server.listen(PORT);
  req = supertest(`localhost:${PORT}`);

  afterAll(() => server.close());

  it('Create new user1', async () => {
    // Should get created user and status code 201

    const res = await req.post(`${BASE_URL}`).send(testUser1);

    id1 = res.body.id;
    const createdUser = { id: id1, ...testUser1 };

    expect(res.body).toEqual(createdUser);
    expect(res.status).toBe(201);
  });

  it('Create new user2', async () => {
    // Should get created user and status code 201

    const res = await req.post(`${BASE_URL}`).send(testUser2);

    id2 = res.body.id;
    const createdUser = { id: id2, ...testUser2 };

    expect(res.body).toEqual(createdUser);
    expect(res.status).toBe(201);
  });

  it('Create new user3', async () => {
    // Should get created user and status code 201

    const res = await req.post(`${BASE_URL}`).send(testUser3);

    id3 = res.body.id;
    const createdUser = { id: id3, ...testUser3 };

    expect(res.body).toEqual(createdUser);
    expect(res.status).toBe(201);
  });

  it('Get all user', async () => {
    // Should get users array and status code 200

    const res = await req.get(`${BASE_URL}`);

    const usersArray = [
      { id: id1, ...testUser1 },
      { id: id2, ...testUser2 },
      { id: id3, ...testUser3 },
    ];

    expect(res.body).toEqual(usersArray);
    expect(res.status).toBe(200);
  });

  it('Attempt to create a user with an extra field', async () => {
    // Create a user with an extra field. Should get users array and status code 200

    let res = await req.post(`${BASE_URL}`).send({
      ...extraFieldUser,
      extraField: 'Some info',
    });

    id4 = res.body.id;

    res = await req.get(`${BASE_URL}`);

    const usersArray = [
      { id: id1, ...testUser1 },
      { id: id2, ...testUser2 },
      { id: id3, ...testUser3 },
      { id: id4, ...extraFieldUser },
    ];

    expect(res.body).toEqual(usersArray);
    expect(res.status).toBe(200);
  });
});
