import "@/app/globals.css"
import "@/styles/threads.css"
import "@/styles/utils.css"
import Index from "@/app/index"
import InfoBar from "@/components/ui/InfoBar"
import SideBar from "@/components/ui/SideBar"
import MediaViewer from "@/components/ui/threads/MediaViewer"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useMediaViewerStore } from "@/hooks/useMediaViewerStore"
import { apiGet } from "./api"

const maxConnectionAttempts = 5

let connectionAttempts = 1

async function getApiHealth() {
  try {
    const healthData = await apiGet("/health")
    console.log("Health:", healthData.status)
  } catch (err: any) {
    alert(`Couldn't connect to server! Retrying in 5 seconds.`)
    console.error('Could not retrieve API data, retyring in 5 sconds.', err.message, err.code)

    if (connectionAttempts <= maxConnectionAttempts) {
      console.log(`Attempt [${connectionAttempts.toString()}]: Retrying connection to server...`)

      connectionAttempts++

      setTimeout(() => {
        connectionAttempts <= 5 && getApiHealth()
      }, 5000);
    }
  }
}

getApiHealth()

const Stack = createNativeStackNavigator()

export default function RootLayout() {
  const { showMediaViewer } = useMediaViewerStore();

  return (<>
    <div className="sides" style={{ justifyContent: "end" }}>
      <SideBar />
    </div>

    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
      <Stack.Screen name="Home" component={Index} />
    </Stack.Navigator>

    <div className="sides">
      <InfoBar />
    </div>

    {showMediaViewer && <MediaViewer />}
  </>)
}
