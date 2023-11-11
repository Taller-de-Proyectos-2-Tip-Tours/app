import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchNotificationHistoryUseCase = async () => {
  try {
    const storedNotifications = await AsyncStorage.getItem(
      "notificationHistory"
    );
    if (storedNotifications) {
      return JSON.parse(storedNotifications);
    }
    return [];
  } catch (error) {
    console.error("Error fetching notification history: ", error);
  }
};
