const postsService = require('../services/postsService');
const authorsService = require('../services/authorsService');

const getAll = async (req, res, next) => {
  try {
    const posts = await postsService.getAll();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const post = await postsService.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const getByAuthor = async (req, res, next) => {
  try {
    const author = await authorsService.getById(req.params.authorId);
    if (!author) return res.status(404).json({ error: 'Author not found' });

    const posts = await postsService.getByAuthor(req.params.authorId);
    res.json({ author, posts });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { author_id, title, content, published } = req.body;

    if (!author_id) {
      return res.status(400).json({ error: 'author_id is required' });
    }
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'title is required' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'content is required' });
    }

    const author = await authorsService.getById(author_id);
    if (!author) return res.status(404).json({ error: 'Author not found' });

    const post = await postsService.create({
      author_id,
      title: title.trim(),
      content: content.trim(),
      published,
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { title, content, published } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ error: 'title cannot be empty' });
    }
    if (content !== undefined && !content.trim()) {
      return res.status(400).json({ error: 'content cannot be empty' });
    }

    const post = await postsService.update(req.params.id, { title, content, published });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await postsService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, getByAuthor, create, update, remove };