// HomeScreen.js
import React, { useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import Toast from "react-native-toast-message";
import messaging from "@react-native-firebase/messaging";
import { loginUseCase } from "../../useCases/login/loginUseCase";
import { storeToken } from "../../useCases/login/storeToken";
import { firebase } from "@react-native-firebase/auth";

export default function LoginScreen() {
  const navigation = useNavigation();
  const image = {
    uri: "https://img.freepik.com/free-photo/couple-nature-consulting-map_23-2148927964.jpg?w=740&t=st=1695601076~exp=1695601676~hmac=696118ad8c827d23ac45aca40822cfd6118ccaae4fd62e75a9285b7df66a9607",
  };

  const showLoginSuccess = (userName) => {
    Toast.show({
      type: "success", // 'success', 'error', 'info', 'warning'
      position: "bottom", // 'top', 'bottom', 'center'
      text1: `Bienvenido ${userName}`,
      visibilityTime: 3000, // Duration in milliseconds
    });
  };

  const sendToken = async (email) => {
    let token = await messaging().getToken();
    await loginUseCase(email, token).then((response) => {
      console.log(
        `Success response from login use case ${JSON.stringify(response)}`
      );
    });
  };

  const showLoginError = () => {
    Toast.show({
      type: "error", // 'success', 'error', 'info', 'warning'
      position: "bottom", // 'top', 'bottom', 'center'
      text1: `Hubo un error intentando iniciar tu sesión`,
      visibilityTime: 3000, // Duration in milliseconds
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      let userSigned = await GoogleSignin.isSignedIn();
      if (!userSigned) {
        const userInfo = await GoogleSignin.signIn();
        commonLogin(userInfo);
      }
    } catch (error) {
      showLoginError();
      console.error("Google Sign-In Error", error);
    }
  };

  const commonLogin = async (userInfo) => {
    await sendToken(userInfo.user.email);
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        let accessToken = await user.getIdToken();
        await storeToken(accessToken);
        showLoginSuccess(userInfo.user.name);
        navigation.replace("Home");
      }
    });
    firebase.auth().signInAnonymously();
  };

  const signInSilenty = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      commonLogin(userInfo);
    } catch (error) {
      console.log("signInSilenty", error);
    }
  };

  useEffect(() => {
    signInSilenty();
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.emptySpace} />
        <View style={styles.card}>
          <Text style={styles.title}>
            Bienvenid@ a Tip Tours, el lugar para planificar tus paseos
          </Text>
          <GoogleSigninButton
            style={styles.signInButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={handleGoogleSignIn}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#4E598C82",
    margin: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  title: {
    backgroundColor: "#4E598CBA",
    borderRadius: 5,
    color: "#FFFFFF",
    fontSize: 24,
    padding: 20,
  },
  emptySpace: {
    flex: 1,
  },
  signInButton: {
    height: 48,
    marginVertical: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
