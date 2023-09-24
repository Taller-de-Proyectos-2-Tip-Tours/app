import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import { PhotoCarousel } from "./PhotoCarousel";
import DateHourPicker from "./CheckboxDropdown";
import CheckboxDropdown from "./CheckboxDropdown";

const { width } = Dimensions.get("window");

export const TourDetail = (props) => {
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
    comments,
  } = props.data;

  const [selectedOption, setSelectedOptions] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions(option);
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
        <View key={6} style={styles.row}>
          <Text style={styles.label}>{city}</Text>
          <Text style={styles.label}>El guia habla en: {language}</Text>
        </View>
        <View key={8}>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.toggleButton}
          >
            <Text>Ver fechas disponibles</Text>
          </TouchableOpacity>
          <CheckboxDropdown
            options={availableDates.map(
              (date) => `${date.date} - ${date.time}`
            )}
            selectedOptions={selectedOption}
            onSelect={handleOptionSelect}
            visible={dropdownVisible}
            onClose={toggleDropdown}
          />
          <Text>Fecha y hora seleccionada {selectedOption}</Text>
        </View>
        <Pressable key={7} style={styles.mainAction} onPress={() => {}}>
          <Text style={styles.mainActionText}>{"Reservar"}</Text>
        </Pressable>

        <View key={9} style={styles.ratingContainer}>
          <Text style={styles.label}>{numRatings} puntuaciones</Text>
          <StarRating
            rating={averageRating}
            onChange={() => {}}
            color="#4E598C"
            starSize={35}
          />
        </View>
        <Text key={10} style={styles.title}>
          Punto de encuentro
        </Text>
        <Text key={11} style={styles.label}>
          {meetingPointDescription}
        </Text>
        <Text key={12} style={styles.title}>
          Comentarios
        </Text>
        {comments.map((item, index) => (
          <Text key={13 + index} style={styles.comment}>
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
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    backgroundColor: "#4E598C",
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
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
  comment: {
    fontSize: 14,
    marginTop: 6,
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
    backgroundColor: `rgba(252, 175, 88, 0.6)`,
    borderRadius: 10,
    marginTop: 24,
  },
  toggleButton: {
    backgroundColor: "#F9C784",
    marginVertical: 10,
    padding: 10,
    borderRadius: 40,
    marginBottom: 20,
    alignItems: "center",
  },
  map: {
    height: 400,
    borderRadius: 15,
  },
});
