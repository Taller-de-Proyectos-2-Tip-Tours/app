import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./src/components/screens/HomeScreen";
import TourListScreen from "./src/components/screens/TourListScreen";
import TourScreen from "./src/components/screens/TourScreen";
import {LogBox, StyleSheet} from "react-native";


const Stack = createStackNavigator();

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  ])

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
});
