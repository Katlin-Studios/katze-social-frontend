// Simple example API for local testing of the social frontend.
// No external dependencies — run with: `node api/api.ts` or `npm run api`.

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
  src: string,
  alt?: string,
}

interface UserData {
  id: string,
  displayName: string,
  username: string,
  isVerified: boolean,
  isOnline: boolean,
  userAvatar?: string,
}

type KatzeThread = 'common' | 'media' | 'poll' | 'audio' | 'advanced'

interface PostData {
  id: string,
  authorId: string,
  timeStamp: number,
  threadType?: KatzeThread,
  textContent?: string,
  mediaContent?: MediaContent[],
  pollOptions?: string[],
  audioContent?: string,
  advancedContent?: any,
  likes: number,
  reactions: object[],
  weaves: number,
  comments: object[],
  bookmarks: number,
}

// In-memory example data
let users: UserData[]
let posts: PostData[]

users = [
  {
    id: '1',
    displayName: 'SadGabi 🖤',
    username: 'sadgabi20',
    isVerified: true,
    isOnline: true,
    userAvatar: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2FynDtisc3_400x400.jpg?alt=media&token=e8a05d5d-09f4-48cf-ae19-343c9c405d9a"
  },
  {
    id: '2',
    displayName: 'CatLover',
    username: 'catlover',
    isVerified: false,
    isOnline: false,
    userAvatar: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2F1975636247331942400-v2-r736x736-s736x736.webp?alt=media&token=b25d18e1-31b3-4d80-9a1f-d8e1ea85a55d",
  },
];

posts = [
  {
    threadType: 'common',
    id: 'p1',
    authorId: '1',
    textContent: "Hi! I'm new here, excited to meet new friends!",
    timeStamp: Date.now() - 1000 * 60 * 60,
    likes: 50,
    reactions: [],
    weaves: 28,
    comments: [],
    bookmarks: 12,
  },
  {
    threadType: 'media',
    id: 'p2',
    authorId: '2',
    textContent: 'I really like these images i found online!',
    likes: 18,
    reactions: [],
    weaves: 13,
    comments: [],
    bookmarks: 9,
    mediaContent: [
      {
        alt: "hi",
        src: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2F00059-2055087321.png?alt=media&token=63164ea4-63e5-4a21-b7c2-ed92a74af4e4",
      },
      {
        alt: "hi2",
        src: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2F1975636247331942400-v2-r736x736-s736x736.webp?alt=media&token=b25d18e1-31b3-4d80-9a1f-d8e1ea85a55d",
      },
      {
        alt: "hi3",
        src: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2F-p00053-1164806123.png?alt=media&token=c0c86be8-8ecc-4dc0-aa9f-189a6973e275",
      },
    ],
    timeStamp: Date.now() - 1000 * 60 * 30
  },
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
      post = { id, authorId: String(body.authorId), textContent: String(body.content), timeStamp: Date.now(), threadType: (body.threadType), mediaContent: (body.mediaContent), pollOptions: (body.pollOptions), audioContent: (body.audioContent), advancedContent: (body.advancedContent), likes: (body.likes), reactions: (body.reactions), weaves: (body.weaves), comments: (body.comments), bookmarks: (body.bookmarks) };
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
