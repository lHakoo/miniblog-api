const pool = require('../db/pool');

const getAll = async () => {
  const { rows } = await pool.query(
    'SELECT id, name, email, bio, created_at FROM authors ORDER BY created_at DESC'
  );
  return rows;
};

const getById = async (id) => {
  const { rows } = await pool.query(
    'SELECT id, name, email, bio, created_at FROM authors WHERE id = $1',
    [id]
  );
  return rows[0] || null;
};

const create = async ({ name, email, bio }) => {
  const { rows } = await pool.query(
    `INSERT INTO authors (name, email, bio)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, bio, created_at`,
    [name, email, bio || null]
  );
  return rows[0];
};

const update = async (id, { name, email, bio }) => {
  const { rows } = await pool.query(
    `UPDATE authors
     SET name = COALESCE($1, name),
         email = COALESCE($2, email),
         bio   = COALESCE($3, bio)
     WHERE id = $4
     RETURNING id, name, email, bio, created_at`,
    [name || null, email || null, bio || null, id]
  );
  return rows[0] || null;
};

const remove = async (id) => {
  const { rowCount } = await pool.query(
    'DELETE FROM authors WHERE id = $1',
    [id]
  );
  return rowCount > 0;
};

const emailExists = async (email, excludeId = null) => {
  const query = excludeId
    ? 'SELECT 1 FROM authors WHERE email = $1 AND id != $2'
    : 'SELECT 1 FROM authors WHERE email = $1';
  const params = excludeId ? [email, excludeId] : [email];
  const { rowCount } = await pool.query(query, params);
  return rowCount > 0;
};

module.exports = { getAll, getById, create, update, remove, emailExists };