import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Home from "./src/pages/Home";
import Camera from "./src/pages/Camera";
import { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#0b6e8a" },
          headerTintColor: "#ffffff",
          contentStyle: { backgroundColor: "#f2f6f8" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Diário de Viagem" }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{ title: "Câmera" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
