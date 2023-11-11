import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeFullNotificationHistoryUseCase = async (
  notificationHistory
) => {
  try {
    await AsyncStorage.setItem(
      "notificationHistory",
      JSON.stringify(notificationHistory)
    );
  } catch (error) {
    console.error("Error storing notification history: ", error);
  }
};
