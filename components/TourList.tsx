import React, { useState, useEffect, Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getToursUseCase } from "../useCases/getToursUseCase";

export const TourList = ({ style }) =>{
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
    <View style={[ style] }>
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
  const {
    start_date,
    duration,
    location,
    guide,
    description,
    limit,
    state
  } = props.data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Destalles del evento</Text>
      <Text>
        <Text style={styles.label}>Fecha de inicio:</Text> {start_date}
      </Text>
      <Text>
        <Text style={styles.label}>Duración:</Text> {duration}
      </Text>
      <Text>
        <Text style={styles.label}>Ubicación:</Text> {location}
      </Text>
      <Text>
        <Text style={styles.label}>Guía:</Text> {guide}
      </Text>
      <Text>
        <Text style={styles.label}>Descripción:</Text> {description}
      </Text>
      <Text>
        <Text style={styles.label}>Cupo:</Text> {limit}
      </Text>
      <Text>
        <Text style={styles.label}>Estado:</Text> {state}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    margin: 16,
    overflow: 'scroll', 
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
});
