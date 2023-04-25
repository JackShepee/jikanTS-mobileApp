import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Seasons from "../Seasons";
import Home from "../Home";
import SearchPage from "../Search";
import TopAnime from "../TopAnime";

const Tab = createMaterialBottomTabNavigator();

const BottomNavBar = () => {
  return (
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
        height: 75,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons name="home" color={color} size={24} />
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
              <MaterialCommunityIcons name="menu" color={color} size={24} />
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
              <MaterialCommunityIcons name="heart" color={color} size={24} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          tabBarLabel: "Find Anime",
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                name="movie-search"
                color={color}
                size={24}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavBar;
