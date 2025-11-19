import "@/app/globals.css"
import "@/styles/threads.css"
import Index from "@/app/index"
import InfoBar from "@/components/ui/InfoBar"
import SideBar from "@/components/ui/SideBar"
import MediaViewer from "@/components/ui/threads/MediaViewer"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useMediaViewerStore } from "@/hooks/useMediaViewerStore"

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
