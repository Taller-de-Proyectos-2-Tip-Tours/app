import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { transformDateToString } from "../useCases/utils";

const CheckboxDropdown = ({
  options,
  selectedOptions,
  onSelect,
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onSelect(item)}
                style={styles.checkboxItem}
              >
                <Text>{`${transformDateToString(item.date)} - Cupo: ${
                  item.people
                }`}</Text>
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor:
                        selectedOptions == item ? "#4E598C" : "white",
                    },
                  ]}
                />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdown: {
    backgroundColor: "white",
    width: 300,
    padding: 10,
    borderRadius: 5,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4E598C",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default CheckboxDropdown;
