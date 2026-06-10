const mockPool = {
  query: jest.fn(),
};

jest.mock('../src/db/pool', () => mockPool);

module.exports = { mockPool };