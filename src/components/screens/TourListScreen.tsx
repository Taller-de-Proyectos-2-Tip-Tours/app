import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TourList } from "../TourList";


export default function TourListScreen() {
  return (
    <View style={styles.container}>
      <TourList style={{ flex: 3 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

