// HomeScreen.js
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { app, authentication } from "../../../App";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Provider as PaperProvider,
  TextInput as PaperTextInput,
} from "react-native-paper";

export default function HomeScreen() {
  const navigation = useNavigation();
  const image = {
    uri: "https://img.freepik.com/free-photo/couple-nature-consulting-map_23-2148927964.jpg?w=740&t=st=1695601076~exp=1695601676~hmac=696118ad8c827d23ac45aca40822cfd6118ccaae4fd62e75a9285b7df66a9607",
  };
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(true);

  const handleRegister = async () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        const user = userCredential.user;
        navigation.navigate("TourList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        navigation.navigate("TourList");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <StatusBar style="auto" />
        <PaperTextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <PaperTextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        
        <Pressable style={styles.toggleButton} onPress={isRegister ? handleRegister : handleLogin } >
        <Text>{isRegister ? "Registrarme" : "Iniciar sesion" }</Text>
          </Pressable>
        <Pressable style={styles.toggleButton} onPress={() => setIsRegister(!isRegister)} >
        <Text>{!isRegister ? "Registrarme" : "Iniciar sesion"}</Text>
          </Pressable>
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
  mainAction: {
    padding: 10,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    backgroundColor: "transparent",
    borderRadius: 40,
  },
  mainActionText: {
    color: "#F5F5DC",
    fontSize: 24,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  toggleButton: {
    backgroundColor: "#A9A9A9",
    marginVertical: 10,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 40,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
