// HomeScreen.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={{ flex: 1 }}>Tip Tour</Text>
      <Button
        
        title="Ver paseos"
        onPress={() => navigation.navigate("TourList")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
