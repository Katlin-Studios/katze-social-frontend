# 🐾 Katze Social – Local Testing API

This is a lightweight, dependency-free mock API for testing the Katze Social frontend. It simulates basic user and post interactions, making it ideal for local development and UI prototyping.

---

## 🚀 Getting Started

Prerequisites
- Node.js (v14+ recommended)
- No external packages required
Run the API

```bash
node api/api.ts
# or
npm run api
```

The server will start on http://localhost:4000 (or the port defined in process.env.PORT).

---

## 📡 Available Endpoints

### Health Check

- `GET /health`
Returns `{ status: "ok", ts: <timestamp> }` to verify the server is running.

###Users

- `GET /users`
Returns the full list of mock users.

- `GET /users/:id`
Fetch a specific user by ID.

### Authentication

- `POST /auth/login`
Simulates login with a username.
**Body:**
```json
{ "username": "sadgabi20" }
```
- **Response:**
Returns a fake token and user info.


### Posts
- `GET /posts`
Returns all posts.

- `POST /posts`
Create a new post.
**Body:**
```json
{
  "authorId": "1",
  "content": "This is a new post!"
}
```

- **Response:**
Returns the created post object.

### Feed
- `GET /feed`
Returns posts merged with author info.

---

## 🧪 Example Users

```json
[
  {
    "id": "1",
    "displayName": "SadGabi",
    "username": "sadgabi20",
    "isVerified": true,
    "isOnline": true
  },
  {
    "id": "2",
    "displayName": "CatLover",
    "username": "catlover",
    "isVerified": false,
    "isOnline": false
  }
]
```

## 📝 Notes

- All data is stored in-memory and resets on server restart.
- CORS is enabled for all origins.
- This API is designed for local testing only — no authentication, persistence, or security features.

---

## 🧩 Extending the API

You can easily add new endpoints or enrich existing ones. For example:
- Add support for media, polls, or audio threads via threadType.
- Implement pagination or filtering for /posts and /feed.
- Simulate user status changes or post interactions.