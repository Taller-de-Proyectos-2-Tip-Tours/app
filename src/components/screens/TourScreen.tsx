import React, { useState } from "react";
import { View, StyleSheet, Pressable, Share } from "react-native";
import { TourDetail } from "../TourDetail";
import Toast from "react-native-toast-message";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useFocusEffect } from "@react-navigation/native";
import { getTourUseCase } from "../../useCases/getTourUseCase";
import { cancelBookingUseCase } from "../../useCases/cancelBookingUseCase";
import { postBookingUseCase } from "../../useCases/postBookingUseCase";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/FontAwesome";
import { shareTourUseCase } from "../../useCases/sharing/shareTourUseCase";
import { addEventUseCase } from "../../useCases/sharing/addEventUseCase";
import { postReviewUseCase } from "../../useCases/reviews/postReviewUseCase";
import { getReviewsUseCase } from "../../useCases/reviews/getReviewsUseCase";

export default function TourScreen({ route, navigation }) {
  let tour = route.params.tour;
  let tourId = route.params.tourId;
  let reserveId = route.params.reserveId;
  let reserveState = route.params.reserveState;
  let reservedDate = route.params.reservedDate;
  let isReserve = route.params.isReserve;

  const [loading, setLoading] = useState(true);
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
        showBookingSuccess(`Se realizó la reserva correctamente`);

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
        showBookingSuccess(`Se canceló la reserva correctamente`);
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
    setLoading(true);
    postReviewUseCase(tourDetail.id, body)
      .then((data) => {
        const today = new Date();
        let reviews = tourDetail.comments;
        const newComment = {
          id: reviews.lenght + 1, // Estructura correcta para el objeto _id.$oid
          userName: currentUser.user.name,
          comment: review.comment,
          stars: review.rating,
          date: today,
        };
        reviews.push(newComment);
        console.log("reviews", reviews);
        let newDetail = { comments: reviews, ...tourDetail };
        setLoading(false);
        setTourDetail(newDetail);
        showBookingSuccess(`Tu comentario se recibió correctamente`);
      })
      .catch((err) => {
        setLoading(false);
        showBookingError(err.message);
      });
  };

  const setupReserveHeaderRight = () => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            addEventUseCase(tourDetail.name, reservedDate, tourDetail.duration, tourDetail.meetingPoint);
          }}
          style={styles.icon}
        >
          <Icon name="calendar" size={25} color="#fff" />
        </Pressable>
      ),
    });
  };

  const setupTourHeaderRight = () => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            shareTourUseCase(tourDetail.id ? tourDetail.id : tourId);
          }}
          style={styles.icon}
        >
          <Icon name="share" size={25} color="#fff" />
        </Pressable>
      ),
    });
  };

  React.useEffect(() => {
    if (isReserve) {
      if (reserveState == "abierto") {
        setupReserveHeaderRight();
      }
    } else {
      setupTourHeaderRight();
    }
  }, [navigation, tourDetail]);

  const getReviews = async (tourDetail) => {
    await getReviewsUseCase(tourDetail, tourDetail.id).then((data) => {
      setTourDetail(data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }
  useFocusEffect(
    React.useCallback(() => {
      if (tour != undefined) {
        getReviews(tour)
        return;
      }

      console.log("Getting tour detail for reserve with tourId", tourId);
      setLoading(true);
      getTourUseCase(tourId)
        .then((data) => {
          getReviews(data)
          console.log("Getting tour detail successfully", tourId);
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
  icon: {
    marginEnd: 10,
  },
});
