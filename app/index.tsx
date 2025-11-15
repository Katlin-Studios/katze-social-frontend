import HeaderExplore from "@/components/ui/HeaderExplore";
import SectionsDisplay from "@/components/ui/SectionsDisplay";
import ThreadsList from '@/components/ui/ThreadsList';
import { apiGet } from "./api";

async function getApiHealth() {
  const healthData = await apiGet("/health")
  console.log("Health:", healthData.status)
}

getApiHealth()


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
          <ThreadsList />
      </div>
    </div>
  );
}
