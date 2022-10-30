import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/query";
import ProfileList from "./Components/ProfileList";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./Components/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProfileTabList">
          <Stack.Screen
            name="ProfileTabList"
            component={ProfileList}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Detailed Report" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
