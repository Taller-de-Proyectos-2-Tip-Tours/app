import React from "react";
import { View, Text,Image, StyleSheet, ScrollView, TouchableHighlight, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const TourList = ({ style, tours}) => {
  return (
    <View style={[style]}>
       <ScrollView>
          {tours.map((item) => (
            <TourDetailsRow data={item} key={item.id} />
          ))}
        </ScrollView>
    </View>
  );
};

const TourDetailsRow = (props) => {
  const navigation = useNavigation();
  const { name, city, mainPhoto } = props.data;

  return (
    <TouchableOpacity onPress={() => navigation.navigate("TourDetail", { tour: props.data })}>
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.thumbail} source={{uri: mainPhoto}}/>
        <View style={styles.columns}>
          <Text style={styles.title} numberOfLines={2} >{name}</Text> 
          <Text style={styles.body}>{city}</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    margin: 16,
  },
  row: {
    flexDirection: "row",
  },
  columns: {
    flexDirection: "column",
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#004E98"
  },
  body: {
    color: "#333333"
  },
  thumbail: {
    backgroundColor: "#F6F6F6",
    width: "20%",
    aspectRatio: 1,
    marginRight: 16,
    borderRadius: 10,
  },
  divider: {
    marginTop: 10,
    height: 1,
    backgroundColor: "#ccc",
    marginRigth: 14,
    marginLeft: 80,
  },
});
