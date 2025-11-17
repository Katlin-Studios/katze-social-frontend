import { ThreadTypes } from "@/types/threads";

export interface MediaContent {
    src: string,
    alt: string,
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

export interface ThreadData {
  authorId: string,
  timestamp: string,
  threadType?: ThreadTypes,
  textContent?: string,
  mediaContent?: MediaContent[],
  pollOptions?: string[],
  audioContent?: string,
  advancedContent?: React.ReactNode,
  likes?: string[],
  reactions?: Reaction[],
  comments?: ThreadData[],
  weaves?: ThreadWeave[],
  bookmarks?: string[],
}

export interface ThreadStats {
    likes?: string[],
    reactions?: Reaction[],
    weaves?: ThreadWeave[],
    comments?: ThreadData[],
    bookmarks?: string[],
}