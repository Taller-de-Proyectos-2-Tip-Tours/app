import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { transformDateToString_2 } from "../useCases/utils";

export const CommentItem = ({ item }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.commentDate}>
          {transformDateToString_2(item.date)}
        </Text>
      </View>
      <StarRating
        rating={item.stars}
        onChange={() => {}}
        color="#FFD700"
        starSize={20}
      />
      <Text style={styles.commentText}>{item.comment}</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.commentImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  commentDate: {
    fontSize: 14,
    color: "#888",
  },
  commentText: {
    fontSize: 16,
  },
  commentImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
    resizeMode: "cover",
    borderRadius: 10,
  },
});

export default CommentItem;
