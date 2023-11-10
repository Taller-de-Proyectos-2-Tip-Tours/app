import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { transformDateToString } from "../useCases/utils";
import ReserveListContainer from "./ReserveListContainer";
import { getTourBasicUseCase } from "../useCases/getTourBasicUseCase";

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
      onPress={() =>
        navigation.navigate("ReserveDetail", {
          tourId: tourId,
          reservedDate: date,
          reserveId: id,
          reserveState: state,
          isReserve: true,
        })
      }
    >
      <ReserveListContainer
        name={name}
        date={transformDateToString(date)}
        people={people}
        state={state}
        tourImage={tourImage}
      />
    </TouchableOpacity>
  );
};
