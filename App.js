import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./src/components/screens/HomeScreen";
import TourListScreen from "./src/components/screens/TourListScreen";
import TourScreen from "./src/components/screens/TourScreen";
import {LogBox, StyleSheet} from "react-native";
import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBPaBjgFdFXgyfc8uqORIrAiYwEqsh2ZsU',
  authDomain: 'tiptour-2023.firebaseapp.com',
  databaseURL: 'https://tiptour-2023.firebaseio.com',
  projectId: 'tiptour-2023',
  storageBucket: 'tiptour-2023.appspot.com',
  messagingSenderId: 'sender-id',
  appId: '1:684674703091:android:d2134d1eb1a8a6de4d6186',
  measurementId: 'G-measurement-id',
};

export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)

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
