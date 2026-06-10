const pool = require('../db/pool');

const getByPost = async (postId) => {
  const { rows } = await pool.query(
    `SELECT c.id, c.content, c.created_at,
            c.post_id,
            c.author_id,
            a.name AS author_name, a.email AS author_email
     FROM comments c
     LEFT JOIN authors a ON a.id = c.author_id
     WHERE c.post_id = $1
     ORDER BY c.created_at ASC`,
    [postId]
  );
  return rows;
};

const getById = async (id) => {
  const { rows } = await pool.query(
    `SELECT c.id, c.content, c.created_at,
            c.post_id, c.author_id,
            a.name AS author_name, a.email AS author_email
     FROM comments c
     LEFT JOIN authors a ON a.id = c.author_id
     WHERE c.id = $1`,
    [id]
  );
  return rows[0] || null;
};

const create = async ({ post_id, author_id, content }) => {
  const { rows } = await pool.query(
    `INSERT INTO comments (post_id, author_id, content)
     VALUES ($1, $2, $3)
     RETURNING id, post_id, author_id, content, created_at`,
    [post_id, author_id || null, content]
  );
  return rows[0];
};

const remove = async (id) => {
  const { rowCount } = await pool.query(
    'DELETE FROM comments WHERE id = $1',
    [id]
  );
  return rowCount > 0;
};

module.exports = { getByPost, getById, create, remove };