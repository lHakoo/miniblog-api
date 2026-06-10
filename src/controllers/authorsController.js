const authorsService = require('../services/authorsService');

const getAll = async (req, res, next) => {
  try {
    const authors = await authorsService.getAll();
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const author = await authorsService.getById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'email is required' });
    }

    const exists = await authorsService.emailExists(email);
    if (exists) {
      return res.status(400).json({ error: 'email already in use' });
    }

    const author = await authorsService.create({ name: name.trim(), email: email.trim(), bio });
    res.status(201).json(author);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({ error: 'name cannot be empty' });
    }
    if (email !== undefined && !email.trim()) {
      return res.status(400).json({ error: 'email cannot be empty' });
    }

    if (email) {
      const exists = await authorsService.emailExists(email, req.params.id);
      if (exists) {
        return res.status(400).json({ error: 'email already in use' });
      }
    }

    const author = await authorsService.update(req.params.id, { name, email, bio });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await authorsService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Author not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };