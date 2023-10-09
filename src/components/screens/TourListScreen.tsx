import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TourList } from "../TourList";
import SearchBox from "../SearchBox";
import { getToursUseCase } from "../../useCases/getToursUseCase";
import FilterModal from "../FilterModal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Spinner from "react-native-loading-spinner-overlay";

export default function TourListScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState(undefined);
  const [nameFilter, setNameFilter] = useState(undefined);

  const applyFilters = (cities) => {
    setSelectedCities(cities);
  };

  const applyNameFilters = (name) => {
    if (name == "") {
      setNameFilter(undefined);
    } else {
      setNameFilter({ name: name });
    }
  };

  const dimissFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  useFocusEffect(React.useCallback(() => {
    setLoading(true);
    let filters = { ...selectedCities, ...nameFilter };
    getToursUseCase(filters)
      .then((data) => {
        setData(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Hubo un error cargando los datos :(");
        setLoading(false);
      });
  }, [selectedCities, nameFilter]));

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.row}>
        <SearchBox onSearch={applyNameFilters} />
        <TouchableOpacity
          onPress={() => setIsFilterModalOpen(true)}
          style={{ padding: 10, flex: 1 }}
        >
          <Image
            source={require("../../../assets/filter.png")} // Replace with your filter icon image path
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <FilterModal
          isVisible={isFilterModalOpen}
          onDismiss={dimissFilterModal}
          onSelect={applyFilters}
        />
      </View>
      {loading ? (
        <Spinner
          visible={loading}
          textContent={"Cargando..."}
          textStyle={{ color: "white" }}
        />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : data.length == 0 ? (
        <Text>No hay tours disponibles</Text>
      ) : (
        <TourList style={{ flex: 3 }} tours={data} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    margin: 16,
    zIndex: 1000,
  },
});
