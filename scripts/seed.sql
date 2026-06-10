TRUNCATE TABLE comments, posts, authors RESTART IDENTITY CASCADE;

INSERT INTO authors (name, email, bio) VALUES
  ('Ana García',    'ana@devspark.io',   'Desarrolladora full-stack apasionada por el open source.'),
  ('Luis Herrera',  'luis@devspark.io',  'Escritor técnico y entusiasta de DevOps.'),
  ('María López',   'maria@devspark.io', 'Diseñadora UX que también programa.');

INSERT INTO posts (author_id, title, content, published) VALUES
  (1, 'Introducción a Node.js',
   'Node.js es un entorno de ejecución para JavaScript construido sobre el motor V8 de Chrome...',
   TRUE),
  (1, 'PostgreSQL para principiantes',
   'PostgreSQL es un sistema de base de datos relacional de código abierto muy potente...',
   TRUE),
  (2, 'CI/CD con GitHub Actions',
   'La integración continua y el despliegue continuo son prácticas fundamentales en DevOps...',
   FALSE),
  (3, 'Diseño accesible: por qué importa',
   'La accesibilidad web no es un extra, es una responsabilidad. Diseñar pensando en todos...',
   TRUE);

INSERT INTO comments (post_id, author_id, content) VALUES
  (1, 2, 'Excelente introducción, muy clara para los que empezamos.'),
  (1, 3, 'Me ayudó muchísimo a entender el event loop.'),
  (2, 1, 'Buen artículo, podrías profundizar en índices avanzados.'),
  (4, 1, 'Completamente de acuerdo, la accesibilidad es fundamental.');