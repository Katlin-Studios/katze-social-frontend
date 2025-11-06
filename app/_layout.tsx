import "@/app/globals.css";
import Index from "@/app/index";
import InfoBar from "@/components/ui/InfoBar";
import SideBar from "@/components/ui/SideBar";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
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
  </>)
}
