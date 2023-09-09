import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TourList } from "./components/TourList";
import React from "react";


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={{ flex: 1 }}>Tip Tour</Text>
      <TourList style={{ flex: 4 }} />
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
