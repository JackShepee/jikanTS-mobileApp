import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import BottomNavBar from "./components/utils/BottomNavBar";
import AnimeDetails from "./components/AnimeDetails";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={BottomNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AnimeDetails"
          component={AnimeDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
