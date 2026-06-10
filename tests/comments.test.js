jest.mock('../src/db/pool', () => ({ query: jest.fn(), on: jest.fn() }));

const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db/pool');

beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}));
afterAll(() => console.error.mockRestore());

describe('Comments API', () => {
  beforeEach(() => jest.clearAllMocks());

  const fakePost = { id: 1, author_id: 1, title: 'Post', content: 'Contenido', published: true };
  const fakeComment = { id: 1, post_id: 1, author_id: 2, content: 'Excelente!', created_at: new Date().toISOString() };

  it('GET /comments/post/:postId - retorna 200', async () => {
    pool.query.mockResolvedValueOnce({ rows: [fakePost] });
    pool.query.mockResolvedValueOnce({ rows: [fakeComment] });
    const res = await request(app).get('/comments/post/1');
    expect(res.status).toBe(200);
  });

  it('GET /comments/post/:postId - retorna 404 si no existe el post', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).get('/comments/post/999');
    expect(res.status).toBe(404);
  });

  it('POST /comments - retorna 400 si falta content', async () => {
    const res = await request(app).post('/comments').send({ post_id: 1 });
    expect(res.status).toBe(400);
  });

  it('POST /comments - retorna 201 con datos válidos', async () => {
    pool.query.mockResolvedValueOnce({ rows: [fakePost] });
    pool.query.mockResolvedValueOnce({ rows: [fakeComment] });
    const res = await request(app).post('/comments').send({ post_id: 1, content: 'Excelente!' });
    expect(res.status).toBe(201);
  });

  it('DELETE /comments/:id - retorna 204', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 });
    const res = await request(app).delete('/comments/1');
    expect(res.status).toBe(204);
  });
});