import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import StarRating from "react-native-star-rating-widget";
import { transformDateToString } from "../useCases/utils";
import IntegerSelector from "./AmountSelector";
import CheckboxDropdown from "./CheckboxDropdown";
import { PhotoCarousel } from "./PhotoCarousel";
import Icon from "react-native-vector-icons/FontAwesome";
import CommentsModal from "./CommentsModal";

const { width } = Dimensions.get("window");

export const TourDetail = (props) => {
  const { isReserve, handleBooking, reservedDate, handleCancelBooking, handleReviewPosting } = props;

  const [tourDetail, setTourDetail] = useState(props.tourDetail);
  const [reserveDate, setReserveDates] = useState(reservedDate);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [participants, setParticipants] = useState(1);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

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
    setReserveDates(option);
    toggleDropdown();
  };

  const isButtonEnabled = () =>
    reserveDate && participants > 0 && !isReserveButtonDisabled();

  const isReserveButtonDisabled = () => {
    if (!isReserve) return false;
    const today = new Date();
    const reserveDate = new Date(reservedDate);
    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
    const reserveTimestap = reserveDate.getTime() - twentyFourHoursInMilliseconds;
    return reserveTimestap <= today.getTime();
  };

  return (
    <View style={styles.columns}>
      <ScrollView style={styles.scrollView}>
        <PhotoCarousel
          key={1}
          style={styles.image}
          photos={[tourDetail.mainPhoto, ...tourDetail.extraPhotos]}
        />

        <View key={2} style={styles.row}>
          <Icon name="map" size={25} color="#4E598C" />
          <Text style={styles.label2}>{tourDetail.city}</Text>
          <Icon name="language" size={25} color="#4E598C" />
          <Text style={styles.label2}>{tourDetail.language}</Text>
        </View>

        <Text key={3} style={styles.title}>
          {tourDetail.name}
        </Text>
        <Text key={4} style={styles.label}>
          {tourDetail.description}
        </Text>
        {/* <View key={4} style={styles.divider} />
        <Text key={5} style={styles.title}>
          Cupo maximo {tourDetail.maxCapacity} personas
        </Text>
        <Text key={6} style={styles.label}>
          Duración {tourDetail.duration} hs
        </Text>
        <View key={7} style={styles.row}>
          <Text style={styles.label}>{tourDetail.city}</Text>
          <Text style={styles.label}>
            El guia habla en: {tourDetail.language}
          </Text>
        </View> */}
        <View key={5} style={styles.row}>
          <Icon name="map-marker" size={25} color="#4E598C" />
          <Text style={styles.label2}>
            {tourDetail.meetingPointDescription}
          </Text>
          <Icon name="clock-o" size={25} color="#4E598C" />
          <Text style={styles.label2}>{tourDetail.duration}</Text>
        </View>
        <View key={8}>
          {!isReserve ? (
            <>
              <TouchableOpacity
                onPress={toggleDropdown}
                style={styles.toggleButton}
              >
                <Text style={styles.buttonText}>Elegir fecha</Text>
              </TouchableOpacity>
              <CheckboxDropdown
                options={tourDetail.availableDates}
                selectedOptions={reserveDate}
                onSelect={handleDateSelection}
                visible={dropdownVisible}
                onClose={toggleDropdown}
              />
              {reserveDate && (
                <Text style={styles.label3}>
                  Fecha y hora seleccionada {"\n"}{" "}
                  {reserveDate ? transformDateToString(reserveDate.date) : ""}
                </Text>
              )}
            </>
          ) : (
            <>
              {/* aca hay que buscar la menera de mostrar la fecha de la reserva */}
              <Text style={styles.label3}>
                Fecha y hora seleccionada {"\n"}{" "}
                {reserveDate ? transformDateToString(reservedDate) : ""}
              </Text>
            </>
          )}
        </View>
        <View key={23}>
          {!isReserve ? (
            <>
              <Text>Cantidad de personas</Text>
              <IntegerSelector
                value={participants}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            </>
          ) : (
            <></>
          )}
        </View>
        <Pressable
          key={9}
          style={[
            styles.toggleButton,
            {
              backgroundColor: isButtonEnabled() ? "#4E598C" : "#A9A9A9",
            },
          ]}
          onPress={() => {
            if (reserveDate) {
              // Verifica si reserveDate tiene un valor
              if (isReserve) {
                if(!isReserveButtonDisabled())
                  handleCancelBooking(reserveDate.date);
              } else {
                handleBooking(reserveDate.date, participants);
              }
            }
          }}
        >
          <Text style={styles.buttonText}>
            {isReserve ? "Cancelar reserva" : "Reservar"}
          </Text>
        </Pressable>
        <>
        {isReserveButtonDisabled() && (
          <Text
            style={[
              styles.label3,
              {
                color: "red",
              },
            ]}
          >
            Solo se puede cancelar una reserva 24hs antes de su inicio
          </Text>
        )}</>
         <Pressable
          key={26}
          style={styles.toggleButton}
          onPress={() => {
            setIsCommentModalOpen(true);
          }}
    
        >
       
          <Text style={styles.buttonText}>Dejá tu comentario</Text>
        </Pressable>

        <CommentsModal
          isVisible={isCommentModalOpen}
          onDismiss={() => setIsCommentModalOpen(false)}
          onSelect={handleReviewPosting}
        />
        <View key={10} style={styles.ratingContainer}>
          <Text style={styles.label}>{tourDetail.numRatings} puntuaciones</Text>
          <StarRating
            rating={tourDetail.averageRating}
            onChange={() => {}}
            color="#FFD700"
            starSize={35}
          />
        </View>
        <View key={11}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: tourDetail.stops[0].lat,
              longitude: tourDetail.stops[0].lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {tourDetail.stops.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.lat, longitude: marker.lon }}
                title={marker.tag}
                // description={marker.description}
              />
            ))}
          </MapView>
        </View>
        {/* <Text key={12} style={styles.title}>
          Punto de encuentro
        </Text>
        <Text key={13} style={styles.label}>
          {tourDetail.meetingPointDescription}
        </Text> */}
        <Text key={14} style={styles.title}>
          Comentarios
        </Text>
        <FlatList
        data={tourDetail.comments}
        style={{marginVertical: 10}}
        renderItem={({item}) => <Text 
         style={styles.comment}>
          {item.user}: {item.comment}
        </Text>}
        keyExtractor={item => item.id}
      />
       
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
    marginTop: 10,
    alignItems: "center",
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
  label2: {
    fontSize: 18,
    color: "#333333",
    textAlign: "right",
  },
  label3: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  comment: {
    fontSize: 14,
    marginVertical: 6,
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
