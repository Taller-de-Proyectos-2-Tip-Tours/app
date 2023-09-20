import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TourDetail } from "../TourDetail";


export default function TourScreen() {
  return (
    <View style={styles.container}>
      <TourDetail data={
        {
          "id": 1,
          "name": "Scenic Hike in the Mountains",
          "duration": "3 hours",
          "description": "Enjoy a breathtaking hike in the mountains with stunning views.",
          "maxCapacity": 20,
          "city": "Mountainville",
          "language": "English",
          "guideName": "John Smith",
          "numRatings": 25,
          "averageRating": 4.5,
          "availableDates": [
            {
              "date": "2023-10-01",
              "time": "10:00 AM"
            },
            {
              "date": "2023-10-08",
              "time": "9:30 AM"
            },
            {
              "date": "2023-10-15",
              "time": "11:00 AM"
            }
          ],
          "mainPhoto": "scenic-hike-main.jpg",
          "extraPhotos": [
            "scenic-hike-1.jpg",
            "scenic-hike-2.jpg",
            "scenic-hike-3.jpg"
          ],
          "mapPrototype": "map-prototype.jpg",
          "meetingPointDescription": "Meet at the trailhead parking lot.",
          "numReviews": 15,
          "averageReviewRating": 4.3,
          "comments": [
            {
              "user": "Alice",
              "comment": "The views were amazing!"
            },
            {
              "user": "Bob",
              "comment": "Great guide, very knowledgeable."
            },
            {
              "user": "Eve",
              "comment": "I had a fantastic time on this hike."
            }
          ]
        }        
      } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
