
import HeaderExplore from "@/components/ui/HeaderExplore";
import SectionsDisplay from "@/components/ui/SectionsDisplay";
import ThreadContainer from "@/components/ui/threads/ThreadContainer";

export default function Index() {
  const indexSections = [
    {id: "forYou", title: "For You", isActive: true},
    {id: "recents", title: "Recents"},
    {id: "following", title: "Following"},
    {id: "spaces", title: "My Spaces"}
  ]

  return (
      <div className="main">
        <HeaderExplore />
        <SectionsDisplay sections={indexSections} />
        <ThreadContainer
          displayName="SadGabi"
          username="sadgabi20"
          timestamp="2h"
          />
      </div>
  );
}
