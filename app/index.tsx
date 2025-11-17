import HeaderExplore from "@/components/ui/HeaderExplore";
import SectionsDisplay from "@/components/ui/SectionsDisplay";
import ThreadsList from '@/components/ui/ThreadsList';
import { apiGet } from "./api";

async function getApiHealth() {
  try {
    const healthData = await apiGet("/health")
    console.log("Health:", healthData.status)
  } catch (err: any) {
    alert(`Couldn't connect to server!`)
    console.error('Frontend could not retrieve API information', err.message, err.code)
  }
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
