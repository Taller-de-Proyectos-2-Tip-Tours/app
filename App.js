import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./components/screens/HomeScreen";
import TourListScreen from "./components/screens/TourListScreen";
import TourScreen from "./components/screens/TourScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TourList" title="Paseos" component={TourListScreen} />
        <Stack.Screen name="TourDetail" title="Detalle del paseo" component={TourScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
