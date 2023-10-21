import React from "react";
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
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
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


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
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });

    console.log(`Token data ${token.data}`);
    console.log(`Token type ${token.type}`);
    console.log(`Token projectId ${ Constants.expoConfig.extra.eas.projectId}`);
  

  return token;
}

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

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#4E598C"
        barStyle="light-content"
      />
      <NavigationContainer>
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
