import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";
import CarScreen from "../screens/CarScreen";
import FavorisScreen from "../screens/FavorisScreen";

export type RootStackParamList = {
  Search: undefined;
  Car: { carId: number };
  Favoris: undefined;
};

const SearchNavigation = createStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <SearchNavigation.Navigator initialRouteName="Search" screenOptions={{ cardStyle: { backgroundColor: "#fff" },headerTitleAlign: 'center' }}>
      <SearchNavigation.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Liste des annonces" }}
      />
      <SearchNavigation.Screen
        name="Car"
        component={CarScreen}
        options={{ title: "Annonce" }}
      />
      <SearchNavigation.Screen
        name="Favoris"
        component={FavorisScreen}
        options={{ title: "Mes Favoris" }}
      />
    </SearchNavigation.Navigator>
  );
}

export default RootStack;
