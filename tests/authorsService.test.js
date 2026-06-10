const { mockPool } = require('./setup');
const authorsService = require('../src/services/authorsService');

describe('authorsService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getAll', () => {
    it('retorna lista de autores', async () => {
      const fakeAuthors = [{ id: 1, name: 'Ana', email: 'ana@test.com' }];
      mockPool.query.mockResolvedValueOnce({ rows: fakeAuthors });
      const result = await authorsService.getAll();
      expect(result).toEqual(fakeAuthors);
    });

    it('retorna array vacío si no hay autores', async () => {
      mockPool.query.mockResolvedValueOnce({ rows: [] });
      const result = await authorsService.getAll();
      expect(result).toEqual([]);
    });
  });

  describe('getById', () => {
    it('retorna el autor cuando existe', async () => {
      const fakeAuthor = { id: 1, name: 'Ana', email: 'ana@test.com' };
      mockPool.query.mockResolvedValueOnce({ rows: [fakeAuthor] });
      const result = await authorsService.getById(1);
      expect(result).toEqual(fakeAuthor);
    });

    it('retorna null si el autor no existe', async () => {
      mockPool.query.mockResolvedValueOnce({ rows: [] });
      const result = await authorsService.getById(999);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('inserta y retorna el autor creado', async () => {
      const input = { name: 'Luis', email: 'luis@test.com', bio: 'Dev' };
      const created = { id: 2, ...input, created_at: new Date() };
      mockPool.query.mockResolvedValueOnce({ rows: [created] });
      const result = await authorsService.create(input);
      expect(result).toEqual(created);
    });

    it('pasa null como bio si no se provee', async () => {
      const input = { name: 'María', email: 'maria@test.com' };
      mockPool.query.mockResolvedValueOnce({ rows: [{ id: 3, ...input, bio: null }] });
      await authorsService.create(input);
      expect(mockPool.query).toHaveBeenCalledWith(
        expect.anything(),
        ['María', 'maria@test.com', null]
      );
    });
  });

  describe('remove', () => {
    it('retorna true si se eliminó el autor', async () => {
      mockPool.query.mockResolvedValueOnce({ rowCount: 1 });
      const result = await authorsService.remove(1);
      expect(result).toBe(true);
    });

    it('retorna false si el autor no existe', async () => {
      mockPool.query.mockResolvedValueOnce({ rowCount: 0 });
      const result = await authorsService.remove(999);
      expect(result).toBe(false);
    });
  });

  describe('emailExists', () => {
    it('retorna true si el email está en uso', async () => {
      mockPool.query.mockResolvedValueOnce({ rowCount: 1 });
      const result = await authorsService.emailExists('ana@test.com');
      expect(result).toBe(true);
    });

    it('retorna false si el email no está en uso', async () => {
      mockPool.query.mockResolvedValueOnce({ rowCount: 0 });
      const result = await authorsService.emailExists('nuevo@test.com');
      expect(result).toBe(false);
    });
  });
});