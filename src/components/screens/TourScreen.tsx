import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TourDetail } from "../TourDetail";
import Toast from "react-native-toast-message";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getTourUseCase } from "../../useCases/getToursUseCase";
import { cancelBookingUseCase } from "../../useCases/cancelBookingUseCase";
import {
  postBookingUseCase,
  postReviewUseCase,
} from "../../useCases/postBookingUseCase";
import Spinner from "react-native-loading-spinner-overlay";

export default function TourScreen({ route }) {
  let tour = route.params.tour;
  let tourId = route.params.tourId;
  let reserveId = route.params.reserveId;
  let reserveState = route.params.reserveState;
  let reservedDate = route.params.reservedDate;
  let isReserve = tourId != undefined;
  let navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [tourDetail, setTourDetail] = useState(tour);

  const showBookingSuccess = (message) => {
    Toast.show({
      type: "success", // 'success', 'error', 'info', 'warning'
      position: "bottom", // 'top', 'bottom', 'center'
      text1: message,
      visibilityTime: 3000, // Duration in milliseconds
    });
  };

  const showBookingError = (message) => {
    Toast.show({
      type: "error", // 'success', 'error', 'info', 'warning'
      position: "bottom", // 'top', 'bottom', 'center'
      text1: message,
      visibilityTime: 3000, // Duration in milliseconds
    });
  };

  const handleBooking = async (selectedOption, participants) => {
    let currentUser = await GoogleSignin.getCurrentUser();
    let body = {
      tourId: tourDetail.id,
      date: selectedOption,
      traveler: {
        name: currentUser.user.givenName,
        email: currentUser.user.email,
      },
      people: participants,
    };
    await postBookingUseCase(body)
      .then((data) => {
        showBookingSuccess(`Se realizo la reserva correctamente`);

        setTimeout(() => {
          navigation.navigate("bookingTab");
        }, 2000);
      })
      .catch((err) => {
        showBookingError(err.message);
      });
  };

  const handleCancelBooking = async () => {
    cancelBookingUseCase(reserveId)
      .then((data) => {
        showBookingSuccess(`Se cancelo la reserva correctamente`);

        navigation.goBack();
        navigation.navigate("TourList");
      })
      .catch((err) => {
        showBookingError(err.message);
      });
  };

  const handleReviewPosting = async (review) => {
    let currentUser = await GoogleSignin.getCurrentUser();
    let body = {
      stars: review.rating,
      comment: review.comment,
      userEmail: currentUser.user.email,
      userName: currentUser.user.name,
    };
    postReviewUseCase(tourId, body)
      .then((data) => {
        let reviews = tourDetail.comments;
        reviews.push({
          user: currentUser.user.name,
          comment: review.comment,
        });
        console.log("reviews", reviews);
        let newDetail = {comments : reviews , ...tourDetail}
        setTourDetail(newDetail);
        showBookingSuccess(`Se mando el commentario correctamente`);
      })
      .catch((err) => {
        showBookingError(err.message);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!isReserve) {
        return;
      }

      console.log("getting tour detail for reserve with tourId", tourId);
      setLoading(true);
      getTourUseCase(tourId)
        .then((data) => {
          setTourDetail(data);
          setLoading(false);
          console.log("getting tour detail successfully", tourId);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading || tourDetail == undefined ? (
        <Spinner
          visible={loading}
          textContent={"Cargando..."}
          textStyle={{ color: "white" }}
        />
      ) : (
        <TourDetail
          tourDetail={tourDetail}
          reserveState={reserveState}
          isReserve={isReserve}
          reservedDate={reservedDate}
          handleBooking={handleBooking}
          handleCancelBooking={handleCancelBooking}
          handleReviewPosting={handleReviewPosting}
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
