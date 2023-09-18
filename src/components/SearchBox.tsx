import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBox = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText); // Pass the search text to the parent component for filtering/searching
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    alignSelf: 'stretch',
  },
  input: {
    padding: 5,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderColor: '#ccc',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
  },
});

export default SearchBox;
