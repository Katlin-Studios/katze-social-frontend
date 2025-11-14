
import HeaderExplore from "@/components/ui/HeaderExplore";
import SectionsDisplay from "@/components/ui/SectionsDisplay";
import ThreadContainer from "@/components/ui/threads/ThreadContainer";

export default function Index() {
  const indexSections = [
    { id: "forYou", title: "For You", isActive: true },
    { id: "recents", title: "Recents" },
    { id: "following", title: "Following" },
    { id: "spaces", title: "My Spaces" }
  ]

  return (
    <div className="main">
      <HeaderExplore />
      <SectionsDisplay sections={indexSections} />
      <div className="timeline">
        <ThreadContainer
          displayName="SadGabi 🖤"
          username="sadgabi20"
          timestamp="2h"
          isUserVerified={true}
          threadType="common"
          textContent="Just setting up my Katze Social account! Excited to connect with everyone here."
        />

        <ThreadContainer
          displayName="SadGabi 🖤"
          username="sadgabi20"
          timestamp="2h"
          isUserVerified={true}
          threadType="media"
          textContent="I really like these images I found online!"
          mediaContent={[
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
          ]}
        />
      </div>
    </div>
  );
}
