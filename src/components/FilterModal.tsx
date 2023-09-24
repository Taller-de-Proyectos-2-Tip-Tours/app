import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Pressable, Modal } from "react-native";
import { getCitiesUseCase } from "../useCases/getCitiesUseCase";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";

const FilterModal = ({ isVisible, onDismiss, onSelect }) => {
  const [selectedCityItem, setSelectedCityItem] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [availableCities, setAvailableCities] = useState([]);

  const handleFilterConfirmation = () => {
    onSelect(selectedFilters);
    onDismiss();
  };

  const clearFilter = () => {
    onSelect(undefined);
    onDismiss();
  };

  useEffect(() => {
    getCitiesUseCase()
      .then((data) => {
        setAvailableCities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <Modal
      animationType="slide"
      onRequestClose={onDismiss}
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.title}>Seleccione una ciudad</Text>

          <Picker
            mode="dropdown"
            selectedValue={selectedCityItem}
            style={{ height: 50, width: "100%" }}
            onValueChange={(itemValue) => {
              setSelectedCityItem(itemValue);
              setSelectedFilters({ ...selectedFilters, city: itemValue });
            }}
          >
            {availableCities.map((city, index) => (
              <Picker.Item key={index} label={city.name} value={city.name} />
            ))}
          </Picker>

          <Pressable
            style={styles.mainAction}
            onPress={handleFilterConfirmation}
          >
            <Text style={styles.mainActionText}>{"Confirmar"}</Text>
          </Pressable>
          <Pressable style={styles.mainAction} onPress={onDismiss}>
            <Text style={styles.mainActionText}>{"Cancelar"}</Text>
          </Pressable>
          <Pressable style={styles.mainAction} onPress={clearFilter}>
            <Text style={styles.mainActionText}>{"Limpiar"}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    margin: 20,
  },
  mainAction: {
    width: "100%",
    padding: 10,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    backgroundColor: "#4E598C",
    borderRadius: 40,
  },
  mainActionText: {
    color: "#fff",
    fontSize: 16,
  },
});
