import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import StarRating from "react-native-star-rating-widget";

const CommentsModal = ({ isVisible, onDismiss, onSelect }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  const handleInputConfirmation = () => {
    if (!isButtonEnabled) return;
    onSelect({ comment, rating });
    onDismiss();
  };

  useEffect(() => {
    setButtonEnabled(comment.length > 0 && rating > 0);
  }, [comment, rating]);

  return (
    <Modal
      animationType="slide"
      onRequestClose={onDismiss}
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.modal}>
        <View style={styles.container}>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            onChangeText={(text) => setComment(text)}
            value={comment}
            style={styles.inputArea}
            placeholder="Escribe un comentario"
          />

          <Text style={styles.label}>
            Comentarios ofensivos o lenguaje grosero seran eliminados
          </Text>

          <View style={styles.divider} />

          <StarRating
            rating={rating}
            onChange={(newRating) => setRating(newRating)}
            color="#F9C784"
            starSize={35}
            style={styles.rating}
          />

          <Pressable
            style={[
              styles.mainAction,
              {
                backgroundColor: isButtonEnabled ? "#4E598C" : "#A9A9A9",
              },
            ]}
            onPress={handleInputConfirmation}
          >
            <Text style={styles.mainActionText}>{"Confirmar"}</Text>
          </Pressable>
          <Pressable style={styles.secondAction} onPress={onDismiss}>
            <Text style={styles.mainActionText}>{"Cancelar"}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CommentsModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  rating: {

    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    color: "#333333",
  },
  inputArea: {
    height: 100,
    width: "100%",
    borderRadius: 5,
    padding: 15,
    margin: 20,
    borderColor: "#4E598C",
    borderWidth: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    margin: 20,
  },
  divider: {
    marginVertical: 10,
    width: "95%",
    
    height: 1,
    backgroundColor: "#4E598C",
  },
  mainAction: {
    width: "100%",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    backgroundColor: "#4E598C",
    borderRadius: 40,
  },

  secondAction: {
    width: "100%",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    backgroundColor: "#4E598C80",
    borderRadius: 40,
  },
  mainActionText: {
    color: "#fff",
    fontSize: 14,
  },

  
});
