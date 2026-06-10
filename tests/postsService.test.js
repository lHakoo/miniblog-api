const { mockPool } = require('./setup');
const postsService = require('../src/services/postsService');

describe('postsService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getAll', () => {
    it('retorna lista de posts', async () => {
      const fakePosts = [{ id: 1, title: 'Post 1', author_id: 1 }];
      mockPool.query.mockResolvedValueOnce({ rows: fakePosts });
      const result = await postsService.getAll();
      expect(result).toEqual(fakePosts);
    });
  });

  describe('getById', () => {
    it('retorna el post cuando existe', async () => {
      const fakePost = { id: 1, title: 'Post 1', author_id: 1 };
      mockPool.query.mockResolvedValueOnce({ rows: [fakePost] });
      const result = await postsService.getById(1);
      expect(result).toEqual(fakePost);
    });

    it('retorna null si el post no existe', async () => {
      mockPool.query.mockResolvedValueOnce({ rows: [] });
      const result = await postsService.getById(999);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('crea un post y lo retorna', async () => {
      const input = { author_id: 1, title: 'Nuevo Post', content: 'Contenido', published: false };
      const created = { id: 5, ...input, created_at: new Date() };
      mockPool.query.mockResolvedValueOnce({ rows: [created] });
      const result = await postsService.create(input);
      expect(result).toEqual(created);
    });

    it('usa false como valor por defecto para published', async () => {
      const input = { author_id: 1, title: 'Post', content: 'Contenido' };
      mockPool.query.mockResolvedValueOnce({ rows: [{ id: 6, ...input, published: false }] });
      await postsService.create(input);
      expect(mockPool.query).toHaveBeenCalledWith(
        expect.anything(),
        [1, 'Post', 'Contenido', false]
      );
    });
  });

  describe('remove', () => {
    it('retorna true al eliminar post existente', async () => {
      mockPool.query.mockResolvedValueOnce({ rowCount: 1 });
      const result = await postsService.remove(1);
      expect(result).toBe(true);
    });

    it('retorna false si el post no existe', async () => {
      mockPool.query.mockResolvedValueOnce({ rowCount: 0 });
      const result = await postsService.remove(999);
      expect(result).toBe(false);
    });
  });
});