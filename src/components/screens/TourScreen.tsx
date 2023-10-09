import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TourDetail } from "../TourDetail";
import Toast from "react-native-toast-message";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { cancelBookingUseCase, getToursUseCase, postBookingUseCase } from "../../useCases/getToursUseCase";
import Spinner from "react-native-loading-spinner-overlay";
import { getReserves } from "../../useCases/getReservesUseCase";

export default function TourScreen({ route }) {
  let tour = route.params.tour;
  let tourId = route.params.tourId;
  let reserveId = route.params.reserveId;
  let reservedDate = route.params.reservedDate;
  let isReserve = tourId != undefined;
  let navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [tourDetail, setTourDetail] = useState(tour);

  const showBookingSuccess = () => {
    Toast.show({
      type: "success", // 'success', 'error', 'info', 'warning'
      position: "bottom", // 'top', 'bottom', 'center'
      text1: `Se realizo la reserva correctamente`,
      visibilityTime: 3000, // Duration in milliseconds
    });
  };

  const handleBooking = async (selectedOption, participants) => {
    let currentUser = await GoogleSignin.getCurrentUser();
    let body = {
      tourId: tour.id,
      date: selectedOption,
      traveler: {
        name: currentUser.user.givenName,
        email: currentUser.user.email,
      },
      people: participants,
    };
    let result = postBookingUseCase(body);

    showBookingSuccess();
    setTimeout(() => {
      navigation.navigate("bookingTab");
    }, 2000);
  };

  const handleCancelBooking = async () => {
    cancelBookingUseCase(reserveId);
    Toast.show({
      type: "success", // 'success', 'error', 'info', 'warning'
      position: "bottom", // 'top', 'bottom', 'center'
      text1: `Se cancelo la reserva correctamente`,
      visibilityTime: 3000, // Duration in milliseconds
    });
    navigation.goBack();
    navigation.navigate("TourList");
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!isReserve) {
        return;
      }
      
      console.log("getting tour detail for reserve with tourId" , tourId);
      setLoading(true);
      getToursUseCase({id: tourId})
        .then((data) => {
          setTourDetail(data[0]);
          setLoading(false);
          console.log("getting tour detail successfully" , tourId);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading || tourDetail == undefined? (
        <Spinner
          visible={loading}
          textContent={"Cargando..."}
          textStyle={{ color: "white" }}
        />
      ) : (
        <TourDetail
          tourDetail={tourDetail}
          isReserve={isReserve}
          reservedDate={reservedDate}
          handleBooking={handleBooking}
          handleCancelBooking={handleCancelBooking}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
