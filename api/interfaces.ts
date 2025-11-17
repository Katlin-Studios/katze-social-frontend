import { ThreadTypes } from "@/types/threads"

export interface MediaContent {
  src: string,
  alt?: string,
}

export interface UserData {
  id: string,
  displayName: string,
  username: string,
  isVerified: boolean,
  isOnline: boolean,
  userAvatar?: string,
}

export interface Reaction {
  name: string,
  reactorsIds: string[],
}

export interface ThreadWeave {
  weaverId: string,
  isQuote?: boolean,
  quoteId: string,
}

export interface PollOptions {
  title: string,
  votes: string[], // VOTERS IDS
}

export interface Poll {
  title?: string,
  options: PollOptions[],
  closingDate: number,
}

export interface AudioContent {
    title?: string,
    url: string,
    duration: number
}

export interface ThreadData {
  id: string,
  authorId: string,
  title?: string, // ONLY FOR ADVANCED THREADS
  timeStamp: number,
  threadType?: ThreadTypes,
  textContent?: string,
  mediaContent?: MediaContent[],
  poll?: Poll[],
  audioContent?: AudioContent,
  advancedContent?: string, // MARKDOWN FORMAT THREAD CONTENT
  likes: string[], // IDS OF USERS WHO LIKED
  reactions: Reaction[],
  weaves: ThreadWeave[],
  comments: ThreadData[],
  bookmarks: string[], // IDS OF USERS WHO BOOKMARKED
  isQuote?: boolean,
  quotedThreadId?: string,
}