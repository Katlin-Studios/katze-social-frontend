# Example API (local)

This is a tiny in-memory API for local testing of the frontend. It has no external
dependencies — run it with Node.js.

Run:

```powershell
npm run api
```

Default port: 4000 (set `PORT` to override)

Available endpoints:

- `GET /health` — returns { status: 'ok' }
- `GET /users` — returns sample users
- `GET /users/:id` — get a single user
- `POST /auth/login` — body: { username } — returns a fake token and user
- `GET /posts` — returns posts
- `POST /posts` — body: { authorId, content } — creates a post
- `GET /feed` — returns posts merged with author info

Examples:

```powershell
# health
curl http://localhost:4000/health

# list users
curl http://localhost:4000/users

# login (example)
curl -X POST http://localhost:4000/auth/login -H "Content-Type: application/json" -d '{"username":"sadgabi20"}'

# create post
curl -X POST http://localhost:4000/posts -H "Content-Type: application/json" -d '{"authorId":"1","content":"Hello from curl"}'

# feed
curl http://localhost:4000/feed
```

This server is intentionally tiny and in-memory. It's suitable for local UI testing but not for production. Extend or replace with Express/JSON-server or a real backend when
needed.
