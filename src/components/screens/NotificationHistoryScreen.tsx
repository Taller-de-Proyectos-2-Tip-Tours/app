import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { fetchNotificationHistoryUseCase } from "../../useCases/notification/fetchNotificationHistoryUseCase";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const NotificationHistoryScreen = () => {
  const [notificationHistory, setNotificationHistory] = useState([]);

  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      // Fetch notification history from Firebase
      fetchNotificationHistoryUseCase().then((data) => {
        console.log(`Notifications retrived ${JSON.stringify(data)}`);
        setNotificationHistory(data);
      });
    }, [])
  );

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        const { tourId, date, id, state } = item.data;
        navigation.navigate("bookingTab", {
          screen: "ReserveDetail",
          params: {
            tourId: tourId,
            reservedDate: date,
            reserveId: id,
            reserveState: state,
            isReserve: true,
          },
        });
      }}
    >
      <View style={styles.containerItem}>
        <View style={styles.row}>
          <Image
            style={styles.thumbail}
            source={{ uri: item.notification.android.imageUrl }}
          />
          <View style={styles.columns}>
            <Text style={styles.title}>{item.notification.title}</Text>
            <Text style={styles.body}>{item.notification.body}</Text>
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {notificationHistory == undefined || notificationHistory.length == 0 ? (
        <View style={styles.textContainer}>
          <Image
            style={styles.thumbailEmptyState}
            source={require("../../../assets/leaf.png")}
          />
          <Text>Aún no recibiste notificaciones.</Text>
        </View>
      ) : (
        <FlatList
          data={notificationHistory}
          renderItem={renderNotificationItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerItem: {
    flexDirection: "column",
    margin: 16,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  columns: {
    flexDirection: "column",
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#004E98",
  },
  body: {
    color: "#333333",
  },
  thumbail: {
    backgroundColor: "#F6F6F6",
    width: "20%",
    aspectRatio: 1,
    marginRight: 16,
    borderRadius: 10,
  },
  divider: {
    marginTop: 10,
    height: 1,
    backgroundColor: "#ccc",
    marginRigth: 14,
    marginLeft: 80,
  },
  thumbailEmptyState: {
    width: 150,
    height: 150,
  },
});

export default NotificationHistoryScreen;
