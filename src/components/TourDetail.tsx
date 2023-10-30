import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import StarRating from "react-native-star-rating-widget";
import { transformDateToString } from "../useCases/utils";
import IntegerSelector from "./AmountSelector";
import CheckboxDropdown from "./CheckboxDropdown";
import { PhotoCarousel } from "./PhotoCarousel";
import  CommentItem from './CommentItem';
import Icon from "react-native-vector-icons/FontAwesome";
import CommentsModal from "./CommentsModal";

const { width } = Dimensions.get("window");

export const TourDetail = (props) => {
  const {
    isReserve,
    handleBooking,
    reservedDate,
    reserveState,
    handleCancelBooking,
    handleReviewPosting,
  } = props;

  const [tourDetail, setTourDetail] = useState(props.tourDetail);
  const [reserveDate, setReserveDates] = useState(reservedDate);
  const [reservedState, setReserveStates] = useState(reserveState);
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
    const reserveTimestap =
      reserveDate.getTime() - twentyFourHoursInMilliseconds;
    return reserveTimestap <= today.getTime();
  };

  const borderColors = {
    abierto: 'green', 
    cancelado: 'red',  
    finalizado: 'blue',
  };

  const borderColor = borderColors[reservedState] || "#4E598C"; 

  const stateStyle = {
    backgroundColor: borderColor,
    color: 'white',
    padding: 4,
    borderRadius: 10, // Agrega bordes redondeados al cartel
    paddingHorizontal: 12, // Espacio entre el texto y el borde
    marginVertical: 10,
    textAlign: 'center', 
  };

  tourDetail.comments = tourDetail.comments.map((comment) => ({
    ...comment,
    date: new Date(comment.date), // Supongamos que "date" contiene las fechas en formato válido para Date
    }));

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
              <Text style={{...styles.label3, marginTop: 10 }}>
                Fecha y hora seleccionada {"\n"}{" "}
                {reserveDate ? transformDateToString(reservedDate) : ""}
              </Text>
              {/* <Text style={{...styles.label3, marginTop: 10 }}>
                Estado: {"\n"}{" "}
                {reserveState}
              </Text> */}
               {reserveState && (
                <Text style={[styles.label3, stateStyle]}>{reserveState.toUpperCase()}</Text>
                )}
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
        {
          //reserveState != "finalizado" &&
          (reserveState != "finalizado" && reserveState != "cancelado") &&
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
                if (!isReserveButtonDisabled())
                  handleCancelBooking(reserveDate.date);
              } else {
                handleBooking(reserveDate.date, participants);
              }
            }
          }}
        >
          <Text style={styles.buttonText}>
            {isReserve && reserveState == "abierto"
              ? "Cancelar reserva"
              : "Reservar"}
          </Text>
        </Pressable>
        }
        
        <>
          {isReserveButtonDisabled() && reserveState == "abierto" && (
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
          )}
        </>
        { isReserve && reserveState == "finalizado" &&
          <>
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
          </>
        }

        <View key={10} style={styles.ratingContainer}>
          <Text style={styles.label}>{tourDetail.numRatings} valoraciones</Text>
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
        <Text key={14} style={styles.title}>
          Comentarios
        </Text>

        

        <FlatList
         data={tourDetail.comments.sort((a, b) => b.date - a.date)}
         style={{ marginVertical: 10 }}
         renderItem={({ item }) => <CommentItem item={item} />}
         keyExtractor={(item) => item._id.$oid}  
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
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
    fontWeight: "bold",
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
