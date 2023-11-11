import React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/components/screens/LoginScreen";
import { StatusBar } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Toast, { BaseToast } from "react-native-toast-message";
import { createNavigationContainerRef } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import { storeNotificationHistoryUseCase } from "./src/useCases/notification/storeNotificationHistoryUseCase";
import { setupLogsUseCase } from "./src/useCases/commons/setupLogsUseCase";
import { Stack, TabNavigator } from "./src/components/navigation/navigator";
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
  storeNotificationHistoryUseCase({ ...remoteMessage, handled: false });
  console.log("Message handled in the background!", remoteMessage);
});


export default function App() {
  const navigationRef = createNavigationContainerRef();

  useEffect(() => {
    // Deeplinking
    const handleDeepLink = (link) => {
      console.log("Received deep link:", link.url);
      const { hostname, path, queryParams } = Linking.parse(link.url);
      let tourId = path.split("/").pop();
      navigateToTourUseCase(navigationRef, tourId, false);
    };

    const linkingSubscription = dynamicLinks().onLink(handleDeepLink);

    // Messaging
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Message handled and opened the app",
        JSON.stringify(remoteMessage)
      );
      storeNotificationHistoryUseCase({ ...remoteMessage, handled: true });
      navigateToReseverUseCase(navigationRef, remoteMessage.data, false);
    });

    const onMessageSubscription = messaging().onMessage(
      async (remoteMessage) => {
        storeNotificationHistoryUseCase({ ...remoteMessage, handled: true });
        console.log(
          "A new FCM message arrived!",
          JSON.stringify(remoteMessage)
        );
      }
    );

    return () => {
      linkingSubscription();
      onMessageSubscription();
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
