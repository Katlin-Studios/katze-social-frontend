import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import MediaContainer from "./MediaContainer";
import ThreadStats from "./ThreadStats";
import { apiGet } from "@/app/api";
import { ThreadData } from "@/interfaces/threads";

export default function ThreadContainer({
  authorId,
  timestamp,
  threadType = "common",
  textContent = "",
  mediaContent,
  advancedContent,
  likes = [],
  reactions = [],
  comments = [],
  weaves = [],
  bookmarks = []
}: ThreadData) {
  const [userData, setUserData] = useState<{
    username: string,
    displayName: string,
    isVerified: boolean,
    avatar: string,
  } | null>(null);

  useEffect(() => {
    async function getUserData() {
      try {
        const data = await apiGet(`/users/${authorId}`);
        const user = data.user;

        setUserData({
          username: user.username || "!!undefined!!",
          displayName: user.displayName || "",
          isVerified: user.isVerified || false,
          avatar: user.userAvatar || "",
        });
      } catch (err) {
        console.error(err);
      }
    }

    getUserData();
  }, [authorId]);

  if (!userData) {
    return <div className="thread-container">Loading...</div>;
  }

  return (
    <div className="thread-container">
      {/* avatar */}
      <div
        role="img"
        className="user-icon"
        style={{ backgroundImage: `url(${userData.avatar})` }}
      />
      {/* content */}
      <div className="thread-content">
        <div className="thread-user-info">
          <div className="thread-displayname">
            <a href={`/${userData.username}`} className="thread-displayname-link">
              {userData.displayName}
            </a>
            {userData.isVerified && (
              <MaterialIcons name="verified" color="#35f374" size={16} />
            )}
          </div>
          <span className="thread-username">
            @{userData.username} · {timestamp}
          </span>
        </div>

        <div className="thread-text-content">{textContent}</div>

        {threadType === "media" && <MediaContainer mediaContent={mediaContent} />}

        <ThreadStats likes={likes} reactions={reactions} comments={comments} weaves={weaves} bookmarks={bookmarks} />
      </div>
    </div>
  );
}