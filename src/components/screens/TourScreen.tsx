import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBox from "../SearchBox";


export default function TourScreen() {
  return (
    <View style={styles.container}>
      <Text>Aca va a estar el detalle</Text>
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
