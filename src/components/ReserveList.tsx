import React, { useEffect, useState } from "react";
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
import {getTourBasicUseCase } from "../useCases/getToursUseCase"

export const ReserveList = ({ style, tours }) => {
  const sortedTours = [...tours]; 
  sortedTours.sort((a, b) => {
    if (a.state < b.state) return -1;
    if (a.state > b.state) return 1;
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0; 
  });
  return (
    <View style={[style]}>
      <ScrollView>
        {sortedTours.map((item) => (
          <ReserveListRow data={item} key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
};



const ReserveListRow = (props) => {
  const navigation = useNavigation();
  const { id, tourId, date, people, name, state } = props.data;
  
  const [tourImage, setTourImage] = useState(null);

  useEffect(() => {
    // Aquí obtén la imagen del tour utilizando getTourBasicUseCase por tourId y actualiza el estado con la imagen.
    getTourBasicUseCase(tourId).then((tourData) => {
      if (tourData && tourData.mainImage) {
        setTourImage(tourData.mainImage);
      }
    });
  }, [tourId]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ReserveDetail", { tourId: tourId, reservedDate: date, reserveId: id, reserveState: state})}
    >
      
      <ReserveListContainer
        name= {name}
        date= {transformDateToString(date)}
        people={people}
        state= {state}
        tourImage={tourImage}
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
