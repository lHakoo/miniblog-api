# MiniBlog API

> 🚀 **API en producción:** https://miniblog-api-production-d52f.up.railway.app
> 📚 **Documentación:** https://miniblog-api-production-d52f.up.railway.app/api-docs
> 💻 **Repositorio:** https://github.com/lHakoo/miniblog-api

API REST para gestión de autores, publicaciones y comentarios.
Desarrollada en Node.js + Express + PostgreSQL para **DevSpark**.

---

## Requisitos

- Node.js >= 18
- PostgreSQL >= 14
- npm >= 9

---

## Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/lHakoo/miniblog-api.git
cd miniblog-api

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL

# 4. Crear las tablas
npm run db:setup

# 5. Cargar datos de prueba
npm run db:seed

# 6. Iniciar el servidor
npm run dev
```

El servidor queda disponible en `http://localhost:3000`.

---

## Variables de entorno

| Variable       | Descripción                     | Ejemplo                                          |
|----------------|---------------------------------|--------------------------------------------------|
| `NODE_ENV`     | Entorno de ejecución            | `development`                                    |
| `PORT`         | Puerto del servidor             | `3000`                                           |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL | `postgresql://user:pass@localhost:5432/miniblog` |

---

## Endpoints

### Authors
| Método | Ruta            | Descripción          |
|--------|-----------------|----------------------|
| GET    | /authors        | Listar autores       |
| GET    | /authors/:id    | Obtener autor por ID |
| POST   | /authors        | Crear autor          |
| PUT    | /authors/:id    | Actualizar autor     |
| DELETE | /authors/:id    | Eliminar autor       |

### Posts
| Método | Ruta                      | Descripción                |
|--------|---------------------------|----------------------------|
| GET    | /posts                    | Listar posts               |
| GET    | /posts/:id                | Obtener post por ID        |
| GET    | /posts/author/:authorId   | Posts de un autor          |
| POST   | /posts                    | Crear post                 |
| PUT    | /posts/:id                | Actualizar post            |
| DELETE | /posts/:id                | Eliminar post              |

### Comments
| Método | Ruta                    | Descripción                  |
|--------|-------------------------|------------------------------|
| GET    | /comments/post/:postId  | Listar comentarios de un post|
| POST   | /comments               | Crear comentario             |
| DELETE | /comments/:id           | Eliminar comentario          |

---

## Tests

```bash
# Ejecutar tests
npm test

# Con cobertura
npm run test:coverage
```

---

## Documentación OpenAPI

Con el servidor corriendo abre: `http://localhost:3000/api-docs`

---

## Deploy en Railway

1. Crear proyecto en railway.app
2. Conectar repositorio de GitHub
3. Agregar servicio PostgreSQL
4. Configurar variables: `NODE_ENV=production` y `DATABASE_URL` referenciando el Postgres
5. En la consola de Railway ejecutar `npm run db:setup` y `npm run db:seed`
6. Generar dominio público en Settings → Networking

---

## Uso de IA en el proyecto

Se utilizó Claude (Anthropic) como asistente para la generación del scaffolding inicial, servicios SQL, tests, documentación OpenAPI y README. Todo el código fue revisado y validado manualmente.