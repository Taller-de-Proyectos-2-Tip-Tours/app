import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
    console.log("Storing login token", token);
  } catch (error) {
    console.error("Error storing token: ", error);
  }
};
