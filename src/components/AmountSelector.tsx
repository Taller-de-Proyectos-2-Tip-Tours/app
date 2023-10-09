import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const IntegerSelector = ({ value, onIncrement, onDecrement }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onDecrement} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity onPress={onIncrement} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
    },
    button: {
      backgroundColor: 'lightgray',
      borderRadius: 20,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    value: {
      fontSize: 18,
    },
  });
  
  export default IntegerSelector;