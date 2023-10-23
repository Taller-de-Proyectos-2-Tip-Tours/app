import React from "react";
import { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/components/screens/LoginScreen";
import TourListScreen from "./src/components/screens/TourListScreen";
import TourScreen from "./src/components/screens/TourScreen";
import ProfileScreen from "./src/components/screens/ProfileScreen";
import { LogBox, StyleSheet, StatusBar } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Toast, { BaseToast } from "react-native-toast-message";
import ReservesScreen from "./src/components/screens/ReservesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import {createNavigationContainerRef} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';


const ignoreWarns = [
  "EventEmitter.removeListener",
  "Setting a timer for a long period of time",
  "ViewPropTypes will be removed from React Native",
  "AsyncStorage has been extracted from react-native",
  "exported from 'deprecated-react-native-prop-types'.",
  "Non-serializable values were found in the navigation state.",
  "VirtualizedLists should never be nested inside plain ScrollViews",
  "Google Sign-In Error",
  "Possible Unhandled Promise Rejection",
];

const warn = console.warn;
console.warn = (...arg) => {
  for (const warning of ignoreWarns) {
    if (arg[0].startsWith(warning)) {
      return;
    }
  }
  warn(...arg);
};

LogBox.ignoreLogs(ignoreWarns);

GoogleSignin.configure();
function StackNavigator() {
  return (
    <Stack.Navigator>
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

function StackReserveNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReserveList"
        options={{ title: "Mis reservas" }}
        component={ReservesScreen}
      />
      <Stack.Screen
        name="ReserveDetail"
        options={{ title: "Detalle de la reserva" }}
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
      <Tab.Screen
        name="toursTab"
        component={StackNavigator}
        options={{ title: "Home", headerShown: false }}
      />
      <Tab.Screen
        name="bookingTab"
        component={StackReserveNavigator}
        options={{ title: "Mis reservas", headerShown: false }}
      />
      <Tab.Screen
        name="profileTab"
        component={ProfileScreen}
        options={{ title: "Mi perfil" }}
      />
    </Tab.Navigator>
  );
}

const toastConfig = {
  success: (props) => (
    <BaseToast style={{ width: "90%", borderLeftColor: 'green', ...props.style}} {...props} />
  ),
  error: (props) => (
    <BaseToast style={{ width: "90%",  borderLeftColor: 'red', ...props.style }}
    text1NumberOfLines={2}
     {...props} />
  ),
};

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const navigationRef = createNavigationContainerRef();

  useEffect(() => {
    
    // usado cuando la app esta abierta
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    requestUserPermission();
    messaging().getToken().then((token) => {
      console.log("Token", token);
    });
  
    // Usado ara abrir la app
    messaging().onNotificationOpenedApp(remoteMessage => {
      const { tourId, date, id, state } = remoteMessage.data;
      navigationRef.navigate('Home', {
        screen: 'bookingTab',
        params: {
          screen: "ReserveDetail", 
          params: { tourId: tourId, reservedDate: date, reserveId: id, reserveState: state}
        }
      });
    });
  
    
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#4E598C"
        barStyle="light-content"
      />
      <NavigationContainer 
      ref={navigationRef}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            options={{
              title: "Tip Tours",
              headerStyle: {
                backgroundColor: "#4E598C",
              },
              headerTintColor: "#fff",
            }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={TabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
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
