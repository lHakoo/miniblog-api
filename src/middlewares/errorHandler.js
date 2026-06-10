const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  if (err.code === '23505') {
    return res.status(400).json({ error: 'Duplicate value: ' + err.detail });
  }

  if (err.code === '23503') {
    return res.status(400).json({ error: 'Referenced resource does not exist' });
  }

  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;