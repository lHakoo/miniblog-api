const pool = require('../db/pool');

const getAll = async () => {
  const { rows } = await pool.query(
    `SELECT p.id, p.title, p.content, p.published, p.created_at,
            p.author_id,
            a.name AS author_name, a.email AS author_email
     FROM posts p
     JOIN authors a ON a.id = p.author_id
     ORDER BY p.created_at DESC`
  );
  return rows;
};

const getById = async (id) => {
  const { rows } = await pool.query(
    `SELECT p.id, p.title, p.content, p.published, p.created_at,
            p.author_id,
            a.name AS author_name, a.email AS author_email
     FROM posts p
     JOIN authors a ON a.id = p.author_id
     WHERE p.id = $1`,
    [id]
  );
  return rows[0] || null;
};

const getByAuthor = async (authorId) => {
  const { rows } = await pool.query(
    `SELECT p.id, p.title, p.content, p.published, p.created_at,
            a.id AS author_id, a.name AS author_name,
            a.email AS author_email, a.bio AS author_bio
     FROM posts p
     JOIN authors a ON a.id = p.author_id
     WHERE p.author_id = $1
     ORDER BY p.created_at DESC`,
    [authorId]
  );
  return rows;
};

const create = async ({ author_id, title, content, published }) => {
  const { rows } = await pool.query(
    `INSERT INTO posts (author_id, title, content, published)
     VALUES ($1, $2, $3, $4)
     RETURNING id, author_id, title, content, published, created_at`,
    [author_id, title, content, published ?? false]
  );
  return rows[0];
};

const update = async (id, { title, content, published }) => {
  const { rows } = await pool.query(
    `UPDATE posts
     SET title     = COALESCE($1, title),
         content   = COALESCE($2, content),
         published = COALESCE($3, published)
     WHERE id = $4
     RETURNING id, author_id, title, content, published, created_at`,
    [title || null, content || null, published ?? null, id]
  );
  return rows[0] || null;
};

const remove = async (id) => {
  const { rowCount } = await pool.query(
    'DELETE FROM posts WHERE id = $1',
    [id]
  );
  return rowCount > 0;
};

module.exports = { getAll, getById, getByAuthor, create, update, remove };