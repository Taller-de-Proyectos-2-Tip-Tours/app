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
import ReserveListContainer from "./ReserveListContainer";

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
  const { id, tourId, date, people, name, state } = props.data;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ReserveDetail", { tourId: tourId, reservedDate: date, reserveId: id })}
    >
      <ReserveListContainer
        name= {name}
        date= {transformDateToString(date)}
        people={people}
        state= {state}
      />
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
