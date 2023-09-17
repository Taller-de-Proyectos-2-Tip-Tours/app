import React, { useState, useEffect, Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getToursUseCase } from "../../useCases/getToursUseCase";

export const TourList = ({ style }) => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the API endpoint URL

    // Make the API call
    getToursUseCase()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <View style={[style]}>
      {loading ? (
        <Text>Cargando</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <ScrollView>
          {data.map((item) => (
            <TourDetails data={item} key={item.id} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const TourDetails = (props) => {
  const navigation = useNavigation();
  const { start_date, duration, location, guide, description, limit, state } =
    props.data;

  return (
    <TouchableHighlight onPress={() => navigation.navigate("TourDetail")}>
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.thumbail} />
        <View style={{ flexDirection: "column" }}>
          <Text>
            <Text style={styles.title}>Titulo:</Text> {description}
          </Text>
          <Text>{location}</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    margin: 16,
    overflow: "scroll",
    alignSelf: "stretch",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
  thumbail: {
    backgroundColor: "#F6F6F6",
    width: 65,
    height: 65,
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
