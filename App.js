import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/components/screens/LoginScreen";
import TourListScreen from "./src/components/screens/TourListScreen";
import TourScreen from "./src/components/screens/TourScreen";
import ProfileScreen from "./src/components/screens/ProfileScreen";
import { LogBox, StyleSheet } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Toast from "react-native-toast-message";
import ReservesScreen from "./src/components/screens/ReservesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

GoogleSignin.configure();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
]);
function StackNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="TourList"
        options={{ title: "Paseos" }}
        component={TourListScreen}
      />
      <Stack.Screen
        name="TourDetail"
        options={{ title: "Detalle del paseo" }}
        component={TourScreen}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "toursTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "profileTab") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "bookingTab") {
            iconName = focused ? "book" : "book-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="toursTab" component={StackNavigator} options={{title: "Home", headerShown: false }} />
      <Tab.Screen name="bookingTab" component={ReservesScreen} options={{title: "Mis reservas"}} />
      <Tab.Screen name="profileTab" component={ProfileScreen} options={{title: "Mi perfil"}} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            options={{ title: "Tip Tours" }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={TabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
});
