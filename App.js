import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./src/components/screens/HomeScreen";
import TourListScreen from "./src/components/screens/TourListScreen";
import TourScreen from "./src/components/screens/TourScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title:"Tip Tours" }} component={HomeScreen} />
        <Stack.Screen name="TourList" options={{ title: "Paseos" }} component={TourListScreen} />
        <Stack.Screen name="TourDetail" options={{ title: "Detalle del paseo"}} component={TourScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
