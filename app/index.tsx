
import HeaderExplore from "@/components/ui/HeaderExplore";
import SectionsDisplay from "@/components/ui/SectionsDisplay";

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
      </div>
  );
}
