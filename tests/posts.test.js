jest.mock('../src/db/pool', () => ({ query: jest.fn(), on: jest.fn() }));

const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db/pool');

beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}));
afterAll(() => console.error.mockRestore());

describe('Posts API', () => {
  beforeEach(() => jest.clearAllMocks());

  const fakePost = { id: 1, author_id: 1, title: 'Post', content: 'Contenido', published: false, created_at: new Date().toISOString() };
  const fakeAuthor = { id: 1, name: 'Ana', email: 'ana@test.com' };

  it('GET /posts - retorna 200', async () => {
    pool.query.mockResolvedValueOnce({ rows: [fakePost] });
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
  });

  it('GET /posts/:id - retorna 404 si no existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).get('/posts/999');
    expect(res.status).toBe(404);
  });

  it('POST /posts - retorna 400 si falta title', async () => {
    const res = await request(app).post('/posts').send({ author_id: 1, content: 'Contenido' });
    expect(res.status).toBe(400);
  });

  it('POST /posts - retorna 201 con datos válidos', async () => {
    pool.query.mockResolvedValueOnce({ rows: [fakeAuthor] });
    pool.query.mockResolvedValueOnce({ rows: [fakePost] });
    const res = await request(app).post('/posts').send({ author_id: 1, title: 'Post', content: 'Contenido' });
    expect(res.status).toBe(201);
  });

  it('DELETE /posts/:id - retorna 204', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 });
    const res = await request(app).delete('/posts/1');
    expect(res.status).toBe(204);
  });
});