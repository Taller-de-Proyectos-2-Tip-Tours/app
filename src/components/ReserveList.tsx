import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { transformDateToString } from "../useCases/utils";

export const ReserveList = ({ style, tours }) => {
  return (
    <View style={[style]}>
      <ScrollView>
        {tours.map((item) => (
          <ReserveListRow data={item} key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
};

const ReserveListRow = (props) => {
  const navigation = useNavigation();
  const { id, tourId, date, people, name } = props.data;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ReserveDetail", { tourId: tourId, reservedDate: date, reserveId: id })}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.columns}>
            <Text style={styles.title} numberOfLines={2}>
              {name}
            </Text>
            <Text
              style={styles.body}
            >{`Fecha y hora:  ${transformDateToString(date)}`}</Text>
            <Text
              style={styles.body}
              numberOfLines={2}
            >{`Cantidad de personas: ${people}`}</Text>
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 16,
  },
  row: {
    flexDirection: "row",
  },
  columns: {
    flexDirection: "column",
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#004E98",
  },
  body: {
    color: "#333333",
  },
  divider: {
    marginTop: 10,
    height: 1,
    backgroundColor: "#ccc",
  },
});
