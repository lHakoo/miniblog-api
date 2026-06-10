const commentsService = require('../services/commentsService');
const postsService = require('../services/postsService');

const getByPost = async (req, res, next) => {
  try {
    const post = await postsService.getById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comments = await commentsService.getByPost(req.params.postId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { post_id, author_id, content } = req.body;

    if (!post_id) {
      return res.status(400).json({ error: 'post_id is required' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'content is required' });
    }

    const post = await postsService.getById(post_id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = await commentsService.create({
      post_id,
      author_id: author_id || null,
      content: content.trim(),
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await commentsService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Comment not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getByPost, create, remove };