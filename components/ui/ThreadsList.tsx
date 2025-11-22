import { useEffect, useState } from "react";
import ThreadContainer from "./threads/ThreadContainer";
import { timeAgo } from "@/app/utils";
import { apiGet, fetchAllThreads } from "@/app/api";

export default function ThreadsList() {
  const [threads, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const threads = await fetchAllThreads(true);
        setPosts(threads);
      } catch (err: any) {
        console.error('An error ocurred while retrieving all threads', err.code, err.message);
      }
    }

    !(threads.length > 0) && fetchPosts();
  }, []);

  return (
    <div>
      {threads.map((post, key) => (
        <ThreadContainer
          key={key}
          authorId={post.authorId}
          timestamp={timeAgo(post.timeStamp)}
          threadType={post.threadType}
          textContent={post.textContent}
          mediaContent={post.threadType === "media" ? post.mediaContent : undefined}
          pollOptions={post.threadType === "poll" ? post.pollOptions : undefined}
          audioContent={post.threadType === "audio" ? post.audioContent : undefined}
          advancedContent={post.threadType === "advanced" ? post.advancedContent : undefined}
          likes={post.likes}
          reactions={post.reactions}
          weaves={post.weaves}
          comments={post.comments}
          bookmarks={post.bookmarks}
        />
      ))}
    </div>
  );
}