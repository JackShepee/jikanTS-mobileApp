import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Seasons from "./components/Seasons";
import Home from "./components/Home";
import Profile from "./components/Profile";
import TopAnime from "./components/TopAnime";

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#993E48"
        inactiveColor="#ccc"
        barStyle={{
          backgroundColor: "#414052",
          elevation: 8,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => {
              return (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              );
            },
          }}
        />
        <Tab.Screen
          name="SeasonList"
          component={Seasons}
          options={{
            tabBarLabel: "Airing Now",
            tabBarIcon: ({ color }) => {
              return (
                <MaterialCommunityIcons name="menu" color={color} size={26} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Top Anime"
          component={TopAnime}
          options={{
            tabBarLabel: "Top Anime",
            tabBarIcon: ({ color }) => {
              return (
                <MaterialCommunityIcons name="heart" color={color} size={26} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "My Profile",
            tabBarIcon: ({ color }) => {
              return (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
