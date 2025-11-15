import { useEffect, useState } from "react";
import ThreadContainer from "./threads/ThreadContainer";
import { timeAgo } from "@/app/utils";
import { apiGet } from "@/app/api";

export default function ThreadsList() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await apiGet("/posts");
        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post, key) => (
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