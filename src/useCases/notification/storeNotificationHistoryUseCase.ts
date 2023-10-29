import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeNotificationHistoryUseCase = async (notificationHistory) => {
    try {
      const storedNotifications = await AsyncStorage.getItem('notificationHistory');
      const parsedNotifications = storedNotifications ? JSON.parse(storedNotifications) : [];
      parsedNotifications.push(notificationHistory);
      await AsyncStorage.setItem('notificationHistory', JSON.stringify(parsedNotifications));
    } catch (error) {
      console.error('Error storing notification history: ', error);
    }
  }
