jest.mock('../src/db/pool', () => ({ query: jest.fn(), on: jest.fn() }));

const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db/pool');

beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}));
afterAll(() => console.error.mockRestore());

describe('Authors API', () => {
  beforeEach(() => jest.clearAllMocks());

  const fakeAuthor = { id: 1, name: 'Ana', email: 'ana@test.com', bio: null, created_at: new Date().toISOString() };

  it('GET /authors - retorna 200', async () => {
    pool.query.mockResolvedValueOnce({ rows: [fakeAuthor] });
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /authors/:id - retorna 404 si no existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).get('/authors/999');
    expect(res.status).toBe(404);
  });

  it('POST /authors - retorna 400 si falta name', async () => {
    const res = await request(app).post('/authors').send({ email: 'ana@test.com' });
    expect(res.status).toBe(400);
  });

  it('POST /authors - retorna 201 con datos válidos', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 0 });
    pool.query.mockResolvedValueOnce({ rows: [fakeAuthor] });
    const res = await request(app).post('/authors').send({ name: 'Ana', email: 'ana@test.com' });
    expect(res.status).toBe(201);
  });

  it('DELETE /authors/:id - retorna 204', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 });
    const res = await request(app).delete('/authors/1');
    expect(res.status).toBe(204);
  });
});