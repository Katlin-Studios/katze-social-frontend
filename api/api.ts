// Simple example API for local testing of the social frontend.
// No external dependencies — run with: `node api/api.ts` or `npm run api`.

const http = require('http');
const url = require('url');
const { IncomingMessage, ServerResponse } = require("http");
import { ThreadTypes } from "@/types/threads.ts";
import { MediaContent, UserData, Reaction, ThreadWeave, Poll, AudioContent, ThreadData } from "./interfaces.ts";

const PORT = process.env.PORT || 4000;

// In-memory example data
let users: UserData[]
let threads: ThreadData[]

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
  {
    id: '3',
    displayName: 'CrazyKat!!',
    username: 'cr4zy_ka7',
    isVerified: true,
    isOnline: true,
    userAvatar: "https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2F38b842a2780c3029393dc04843c45954.jpg?alt=media&token=d5f99040-4781-4e60-9102-b3e4d9314d50"
  }
];

threads = [
  {
    threadType: 'common',
    id: 't1',
    authorId: '1',
    textContent: "Hi! I'm new here, excited to meet new friends!",
    timeStamp: Date.now() - 1000 * 60 * 60,
    likes: ['1', '2', '3', '4', '5', '6'],
    reactions: [],
    weaves: [
      {
        weaverId: '1',
        isQuote: true,
        quoteId: '1'
      },
      {
        weaverId: '1',
        isQuote: true,
        quoteId: '1'
      }
    ],
    comments: [],
    bookmarks: ['1', '2', '3', '4', '5', '6'],
  },
  {
    threadType: 'media',
    id: 'tt',
    authorId: '1',
    textContent: 'yo this is fire!!',
    likes: ['1', '2', '3'],
    reactions: [],
    weaves: [
      {
        weaverId: '1',
        isQuote: true,
        quoteId: '1'
      }
    ],
    comments: [],
    bookmarks: ['1', '2', '3', '4', '5', '6'],
    timeStamp: Date.now()  - 1000 * 60 * 45,
    mediaContent: [
      {
        src: 'https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2Fcool_tl.png?alt=media&token=9d16d9a7-97fd-469e-b885-7befddfceb12'
      },
      {
        src: 'https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2Fcool_tr.png?alt=media&token=a296947a-c950-4ff9-b8c8-690539a4f9ce'
      },
      {
        src: 'https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2Fcool_bl.png?alt=media&token=ecf94ed3-7378-4e11-898f-3913065b6510'
      },
      {
        src: 'https://firebasestorage.googleapis.com/v0/b/katze-social.firebasestorage.app/o/public%2Fcool_br.png?alt=media&token=2d54bcad-0440-4779-9e4b-ca0c95cd7ce8'
      }
    ]
  },
  {
    threadType: 'media',
    id: 't2',
    authorId: '2',
    textContent: 'I really like these images i found online!',
    likes: ['1', '2', '3'],
    reactions: [],
    weaves: [
      {
        weaverId: '1',
        isQuote: true,
        quoteId: '1'
      }
    ],
    comments: [],
    bookmarks: ['1', '2', '3', '4', '5', '6'],
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
  {
    threadType: 'common',
    id: 't3',
    authorId: '3',
    textContent: 'Did you know @catlover is crazier than me? lol',
    timeStamp: Date.now() - 1000 * 60 * 27,
    likes: [],
    reactions: [],
    weaves: [],
    comments: [],
    bookmarks: [],
  }
];

function jsonResponse(res: typeof ServerResponse, statusCode: number, obj: any) {
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

function handleOptions(req: typeof IncomingMessage, res: typeof ServerResponse) {
  res.writeHead(204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end();
}

function parseJsonBody(req: typeof IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: any) => (data += chunk));
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

const server = http.createServer(async (req: typeof IncomingMessage, res: typeof ServerResponse) => {
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

    if (req.method === 'GET' && path === '/threads') {
      return jsonResponse(res, 200, { threads });
    }

    const threadIdMatch = path.match(/^\/threads\/(.+)$/);
    if (req.method === 'GET' && threadIdMatch) {
      const id = threadIdMatch[1];
      const thread = threads.find((t) => t.id === id);
      if (!thread) return jsonResponse(res, 404, { error: 'Thread not found' });
      return jsonResponse(res, 200, { thread })
    }

    if (req.method === 'POST' && path === '/threads') {
      const body = await parseJsonBody(req);
      if (!body || !body.authorId || !body.content) return jsonResponse(res, 400, { error: 'authorId and content required' });
      const id = `p${threads.length + 1}`;
      let thread: ThreadData;
      thread = {
        id,
        authorId: String(body.authorId),
        textContent: String(body.content),
        timeStamp: Date.now() as number,
        threadType: body.threadType as ThreadTypes,
        mediaContent: body.mediaContent as MediaContent[],
        poll: body.pollOptions as Poll[],
        audioContent: body.audioContent as AudioContent,
        advancedContent: String(body.advancedContent),
        likes: body.likes as string[],
        reactions: body.reactions as Reaction[],
        weaves: body.weaves as ThreadWeave[],
        comments: body.comments as ThreadData[],
        bookmarks: body.bookmarks as string[],
        isQuote: Boolean(body.isQuote),
        quotedThreadId: String(body.quotedThreadId),
      };
      threads.unshift(thread);
      return jsonResponse(res, 201, { thread });
    }

    if (req.method === 'GET' && path === '/feed') {
      // merge threads with author info
      const feed = threads.map((p) => ({ ...p, author: users.find((u) => u.id === p.authorId) || null }));
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
  console.log('Endpoints: GET /health, GET /users, GET /users/:id, POST /auth/login, GET /threads, POST /threads, GET /feed');
});

module.exports = server;
