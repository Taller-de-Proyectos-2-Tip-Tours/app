import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBox from "../SearchBox";


export default function TourScreen() {
  return (
    <View style={styles.container}>
      <SearchBox onSearch={(searchText) => {}}/>
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
