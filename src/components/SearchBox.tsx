import React, { useState } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const SearchBox = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText); // Pass the search text to the parent component for filtering/searching
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Buscar"
        style={styles.input}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        onSubmitEditing={handleSearch}
      />
      {searchText.length > 0 && (
        <Pressable
          style={styles.cross}
          onPress={() => {
            setSearchText("");
            onSearch("");
          }}
        >
          <Icon name="remove" size={20} color="#4E598C" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 5,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderColor: "#ccc",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    flex: 10,
    flexDirection: "row",
  },
  input: {
    flex: 9,
  },
  cross: {
    marginTop: 5,
    flex: 1,
    alignItems: "center",
  },
});

export default SearchBox;
