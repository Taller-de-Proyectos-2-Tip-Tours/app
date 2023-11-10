import React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/components/screens/LoginScreen";
import { AppRegistry, StatusBar } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Toast, { BaseToast } from "react-native-toast-message";
import * as Notifications from 'expo-notifications';
import { createNavigationContainerRef } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import { storeNotificationHistoryUseCase } from "./src/useCases/notification/storeNotificationHistoryUseCase";
import { setupLogsUseCase } from "./src/useCases/commons/setupLogsUseCase";
import {
  Stack,
  TabNavigator,
} from "./src/components/navigation/StackReserveNavigator";
import * as Linking from "expo-linking";
import { navigateToTourUseCase } from "./src/components/navigation/navigateToTourUseCase";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { navigateToReseverUseCase } from "./src/components/navigation/navigateToReseverUseCase";

setupLogsUseCase();

GoogleSignin.configure();

const toastConfig = {
  success: (props) => (
    <BaseToast
      style={{ width: "90%", borderLeftColor: "green", ...props.style }}
      {...props}
    />
  ),
  error: (props) => (
    <BaseToast
      style={{ width: "90%", borderLeftColor: "red", ...props.style }}
      text1NumberOfLines={2}
      {...props}
    />
  ),
};

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  storeNotificationHistoryUseCase({...remoteMessage, handled: false});
  console.log("Message handled in the background!", remoteMessage);
});

const handleRemoteMessage = (navigationRef, remoteMessage) => {
  console.log("handleRemoteMessage", remoteMessage);
  navigateToReseverUseCase(navigationRef, remoteMessage.data);
};

const setupMessaginUseCase = (navigationRef) => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Message handled and opened the app",
      JSON.stringify(remoteMessage)
    );
    handleRemoteMessage(navigationRef, remoteMessage);
  });


};

export default function App() {
  const navigationRef = createNavigationContainerRef();

  useEffect(() => {
    const handleDeepLink = (link) => {
      // Handle the deep link URL here
      // You can use this URL to navigate or perform specific actions
      console.log("Received deep link:", link.url);
      const { hostname, path, queryParams } = Linking.parse(link.url);
      let tourId = path.split("/").pop();
      navigateToTourUseCase(navigationRef, tourId, false);
    };

    // Add event listener for handling deep links
    const linkingSubscription = dynamicLinks().onLink(handleDeepLink);

    // Messaging
    setupMessaginUseCase(navigationRef);
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        storeNotificationHistoryUseCase(remoteMessage);
        console.log(
          "A new FCM message arrived!",
          JSON.stringify(remoteMessage)
        );
      }
    );

    return () => {
      linkingSubscription();
      unsubscribeOnMessage();
    };
  }, []);

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#4E598C"
        barStyle="light-content"
      />
      <NavigationContainer ref={navigationRef}>
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

