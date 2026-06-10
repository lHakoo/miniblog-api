require('dotenv').config();
const express = require('express');
const cors = require('cors');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const authorsRouter  = require('./routes/authors');
const postsRouter    = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const errorHandler   = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

const swaggerDoc = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', (req, res) => {
  res.json({
    message: 'MiniBlog API',
    version: '1.0.0',
    docs: '/api-docs',
  });
});

app.use('/authors',  authorsRouter);
app.use('/posts',    postsRouter);
app.use('/comments', commentsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;