import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getReserves } from "../../useCases/getReservesUseCase";
import { ReserveList } from "../ReserveList";
import Spinner from "react-native-loading-spinner-overlay";
import { useFocusEffect } from "@react-navigation/native";

export default function ReservesScreen({ route }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(React.useCallback(() => {
    setLoading(true);

    getReserves()
      .then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Hubo un error cargando los datos :(");
        setLoading(false);
      });
  }, []));

  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner
          visible={loading}
          textContent={'Cargando...'}
          textStyle={{ color: "white" }}
          />
      ) : error ? (
        <View style={styles.textContainer}> 
          <Text>Error: {error}</Text>
        </View>
        
      ) : data.length == 0 ? (
        <View style={styles.textContainer}> 
        <Text  style={styles.textContainer}>No hay reservas hechas</Text>
        </View>
      ) : (
        <ReserveList style={{ flex: 3 }} tours={data} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  }
});
