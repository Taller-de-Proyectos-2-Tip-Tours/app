import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getReserves } from "../../useCases/getReservesUseCase";
import { ReserveList } from "../ReserveList";

export default function ReservesScreen({ route }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    getReserves()
      .then((data) => {
        setData(data);
        console.log(data)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Hubo un error cargando los datos :(");
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
    {loading ? (
      <Text>Cargando</Text>
    ) : error ? (
      <Text>Error: {error}</Text>
    ) : data.length == 0 ? (
      <Text>No hay tours disponibles</Text>
    ) : (
      <ReserveList style={{ flex: 3 }} tours={data} />
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  }
});


