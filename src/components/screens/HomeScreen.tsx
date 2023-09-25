// HomeScreen.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View, Text, Pressable, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const image = {uri: 'https://img.freepik.com/free-photo/couple-nature-consulting-map_23-2148927964.jpg?w=740&t=st=1695601076~exp=1695601676~hmac=696118ad8c827d23ac45aca40822cfd6118ccaae4fd62e75a9285b7df66a9607'};

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      
        <StatusBar style="auto" />

        <Pressable
          style={styles.mainAction}
          onPress={() => navigation.navigate("TourList")}
        >
          <Text style={styles.mainActionText}>{"Empieza pasear ahora"}</Text>
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
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
});
