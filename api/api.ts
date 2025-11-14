// Simple example API for local testing of the social frontend.
// No external dependencies — run with: `node api/api.js` or `npm run api`.

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 4000;

interface Request {
  method: 'GET' | 'POST' | 'OPTIONS',
  url: string,
  headers: { [key: string]: string },
  on(event: 'data' | 'end' | 'error', callback: (chunk?: any) => void): void,
  body?: any,
}

interface Response {
  writeHead(statusCode: number, headers: { [key: string]: string }): void,
  end(body?: string): void,
}

interface MediaContent {
  url: string,
  alt?: string,
}

interface UserData {
  id: string,
  displayName: string,
  username: string,
  isVerified: boolean,
  isOnline: boolean,
}

interface PostData {
  threadType?: 'common' | 'media' | 'poll' | 'audio' | 'advanced',
  id: string,
  authorId: string,
  textContent: string,
  mediaContent?: MediaContent[],
  timeStamp: number,
  pollOptions?: string[],
  audioContent?: string,
}

// In-memory example data
let users: UserData[]
let posts: PostData[]

users = [
  { id: '1', displayName: 'SadGabi', username: 'sadgabi20', isVerified: true, isOnline: true },
  { id: '2', displayName: 'CatLover', username: 'catlover', isVerified: false, isOnline: false },
];

posts = [
  { id: 'p1', authorId: '1', textContent: 'Hello from SadGabi!', timeStamp: Date.now() - 1000 * 60 * 60 },
  { id: 'p2', authorId: '2', textContent: 'I love cats 🐱', timeStamp: Date.now() - 1000 * 60 * 30 },
];

function jsonResponse(res: Response, statusCode: number, obj: any) {
  const body = JSON.stringify(obj);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': (Buffer.byteLength(body)).toString(),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(body);
}

function handleOptions(req: Request, res: Response) {
  res.writeHead(204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end();
}

function parseJsonBody(req: Request): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      if (!data) return resolve(null);
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req: Request, res: Response) => {
  try {
    if (req.method === 'OPTIONS') return handleOptions(req, res);

    const parsed = url.parse(req.url, true);
    const path = parsed.pathname || '/';

    // Routes
    if (req.method === 'GET' && path === '/health') {
      return jsonResponse(res, 200, { status: 'ok', ts: Date.now() });
    }

    if (req.method === 'GET' && path === '/users') {
      return jsonResponse(res, 200, { users });
    }

    const userIdMatch = path.match(/^\/users\/(.+)$/);
    if (req.method === 'GET' && userIdMatch) {
      const id = userIdMatch[1];
      const user = users.find((u) => u.id === id);
      if (!user) return jsonResponse(res, 404, { error: 'User not found' });
      return jsonResponse(res, 200, { user });
    }

    if (req.method === 'POST' && path === '/auth/login') {
      const body = await parseJsonBody(req);
      if (!body || !body.username) return jsonResponse(res, 400, { error: 'username is required' });
      const user = users.find((u) => u.username === body.username);
      if (!user) return jsonResponse(res, 404, { error: 'invalid username' });
      // Return a simple fake token and user info
      return jsonResponse(res, 200, { token: `fake-token-${user.id}`, user });
    }

    if (req.method === 'GET' && path === '/posts') {
      return jsonResponse(res, 200, { posts });
    }

    if (req.method === 'POST' && path === '/posts') {
      const body = await parseJsonBody(req);
      if (!body || !body.authorId || !body.content) return jsonResponse(res, 400, { error: 'authorId and content required' });
      const id = `p${posts.length + 1}`;
      let post: PostData;
      post = { id, authorId: String(body.authorId), textContent: String(body.content), timeStamp: Date.now() };
      posts.unshift(post);
      return jsonResponse(res, 201, { post });
    }

    if (req.method === 'GET' && path === '/feed') {
      // merge posts with author info
      const feed = posts.map((p) => ({ ...p, author: users.find((u) => u.id === p.authorId) || null }));
      return jsonResponse(res, 200, { feed });
    }

    // Default: 404
    return jsonResponse(res, 404, { error: 'not found' });
  } catch (err) {
    console.error('API error', err);
    return jsonResponse(res, 500, { error: 'internal error', details: String(err) });
  }
});

server.listen(PORT, () => {
  console.log(`Example API listening on http://localhost:${PORT}`);
  console.log('Endpoints: GET /health, GET /users, GET /users/:id, POST /auth/login, GET /posts, POST /posts, GET /feed');
});

module.exports = server;
