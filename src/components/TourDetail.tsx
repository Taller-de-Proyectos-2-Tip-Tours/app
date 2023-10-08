import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import { PhotoCarousel } from "./PhotoCarousel";
import DateHourPicker from "./CheckboxDropdown";
import CheckboxDropdown from "./CheckboxDropdown";
import MapView, { Marker } from "react-native-maps";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { postBookingUseCase } from "../useCases/getToursUseCase";
import IntegerSelector from "./AmountSelector";
import { transformDateToString } from "../useCases/utils";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export const TourDetail = (props) => {
  const navigation = useNavigation();
  const {
    name,
    duration,
    description,
    maxCapacity,
    city,
    language,
    guideName,
    numRatings,
    averageRating,
    availableDates,
    mainPhoto,
    extraPhotos,
    mapPrototype,
    meetingPointDescription,
    stops,
    comments,
  } = props.data;

  const [selectedOption, setSelectedOptions] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [participants, setParticipants] = useState(1);

  const handleIncrement = () => {
    setParticipants(participants + 1);
  };

  const handleDecrement = () => {
    if (participants > 0) {
      setParticipants(participants - 1);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDateSelection = (option) => {
    setSelectedOptions(option);
    toggleDropdown();
  };

  const isReservButtonEnabled = () => selectedOption && participants > 0;

  const showBookingSuccess = () => {
    Toast.show({
      type: "success", // 'success', 'error', 'info', 'warning'
      position: "bottom", // 'top', 'bottom', 'center'
      text1: `Se realizo la reserva correctamente`,
      visibilityTime: 3000, // Duration in milliseconds
    });
  };

  const handleBooking = async () => {
    let currentUser = await GoogleSignin.getCurrentUser();
    let body = {
      tourId: props.data.id,
      date: selectedOption,
      traveler: {
        name: currentUser.user.givenName,
        email: currentUser.user.email,
      },
      people: participants,
    };
    let result = postBookingUseCase(body);

    showBookingSuccess();
    navigation.navigate("bookingTab");
  };

  return (
    <View style={styles.columns}>
      <ScrollView style={styles.scrollView}>
        <PhotoCarousel
          key={1}
          style={styles.image}
          photos={[mainPhoto, ...extraPhotos]}
        />
        <Text key={2} style={styles.title}>
          {name}
        </Text>
        <Text key={3} style={styles.label}>
          {description}
        </Text>
        <View key={4} style={styles.divider} />
        <Text key={5} style={styles.title}>
          Cupo maximo {maxCapacity} personas
        </Text>
        <Text key={6} style={styles.label}>
          Duración {duration} hs
        </Text>
        <View key={7} style={styles.row}>
          <Text style={styles.label}>{city}</Text>
          <Text style={styles.label}>El guia habla en: {language}</Text>
        </View>
        <View key={8}>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.toggleButton}
          >
            <Text style={styles.buttonText}>Elegir fecha</Text>
          </TouchableOpacity>
          <CheckboxDropdown
            options={availableDates.map((bookings) => bookings.date)}
            selectedOptions={selectedOption}
            onSelect={handleDateSelection}
            visible={dropdownVisible}
            onClose={toggleDropdown}
          />
          <Text style={styles.label}>
            Fecha y hora seleccionada {"\n"}{" "}
            {selectedOption ? transformDateToString(selectedOption) : ""}
          </Text>
        </View>
        <View key={23}>
          <Text>Cantidad de personas</Text>
          <IntegerSelector
            value={participants}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </View>
        <Pressable
          key={9}
          style={[
            styles.toggleButton,
            {
              backgroundColor: isReservButtonEnabled() ? "#4E598C" : "#A9A9A9",
            },
          ]}
          onPress={handleBooking}
        >
          <Text style={styles.buttonText}>{"Reservar"}</Text>
        </Pressable>

        <View key={10} style={styles.ratingContainer}>
          <Text style={styles.label}>{numRatings} puntuaciones</Text>
          <StarRating
            rating={averageRating}
            onChange={() => {}}
            color="#FFD700"
            starSize={35}
          />
        </View>
        <View key={11}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: stops[0].lat,
              longitude: stops[0].lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {stops.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.lat, longitude: marker.lon }}
                title={marker.tag}
                // description={marker.description}
              />
            ))}
          </MapView>
        </View>
        <Text key={12} style={styles.title}>
          Punto de encuentro
        </Text>
        <Text key={13} style={styles.label}>
          {meetingPointDescription}
        </Text>
        <Text key={14} style={styles.title}>
          Comentarios
        </Text>
        {comments.map((item, index) => (
          <Text key={15 + index} numberOfLines={2} style={styles.comment}>
            {item.user}: {item.comment}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 16,
  },
  starts: {
    backgroundColor: "#4E598C",
  },
  image: {
    height: 200,
    borderRadius: 15,
    width: width - 32,
    resizeMode: "stretch",
  },
  columns: {
    flexDirection: "column",
  },
  mainAction: {
    padding: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    backgroundColor: "#007BFF",
    borderRadius: 40,
  },
  mainActionText: {
    color: "#fff",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
    color: "#004E98",
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    color: "#333333",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  comment: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 4,
  },
  divider: {
    marginTop: 10,
    height: 1,
    backgroundColor: "#ccc",
  },
  ratingContainer: {
    alignItems: "center",
    flexDirection: "column",
    padding: 16,
    backgroundColor: `transparent`,
    borderRadius: 10,
  },
  toggleButton: {
    backgroundColor: "#4E598C",
    marginVertical: 10,
    padding: 10,
    borderRadius: 40,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: 250,
    width: "100%",
    marginTop: 10,
    borderRadius: 15,
    alignItems: "center",
  },
});
