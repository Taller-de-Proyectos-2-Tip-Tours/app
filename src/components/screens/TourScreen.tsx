import React from "react";
import { View, StyleSheet } from "react-native";
import { TourDetail } from "../TourDetail";


export default function TourScreen({ route }) {
  return (
    <View style={styles.container}>
      <TourDetail data={route.params.tour} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});


