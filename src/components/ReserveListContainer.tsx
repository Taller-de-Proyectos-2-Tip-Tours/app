import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const ReserveListContainer = ({ name, date, people, state }) => {

    const borderColors = {
        abierto: 'green', 
        cancelado: 'red',  
        finalizado: 'blue',
      };
    
      const borderColor = borderColors[state] || "#4E598C"; 

      const stateStyle = {
        backgroundColor: borderColor,
        color: 'white',
        padding: 4,
        borderRadius: 5, // Agrega bordes redondeados al cartel
        paddingHorizontal: 8, // Espacio entre el texto y el borde
        alignSelf: 'flex-end', 
      };



  return (
    <View style={[styles.container, { borderColor }]}>
    <View style={styles.row}>
      <View style={styles.columns}>
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>
 
        <View style={styles.row}>
          <Icon name="calendar" size={25} color="#4E598C" />
          <Text style={styles.label}>{date}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="user" size={25} color="#4E598C" />
          <Text style={styles.label}>{people}</Text>
        </View>

        {state && (
           <View style={[styles.infoContainer, { marginLeft: 'auto' }]}>
           <Text style={[styles.value, stateStyle]}>{state.toUpperCase()}</Text>
           </View>
        )}
      </View>
    </View>
    <View style={styles.divider} />
  </View>
  );
};

const styles = StyleSheet.create({
container: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 2, // Ancho de los bordes
    elevation: 3,
    margin: 10,
    },
  row: {
    flexDirection: "row",
    //justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  columns: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#004E98"
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#777', // Color para etiquetas
    marginLeft: 10, // Espacio entre etiqueta y valor
    textAlign: "left",
  },
  value: {
    fontSize: 16,
    color: '#fff', // Color blanco para el texto del estado
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 12,
  },
});

export default ReserveListContainer;