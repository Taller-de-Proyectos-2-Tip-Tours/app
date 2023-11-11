import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  try {
    let token = await AsyncStorage.getItem("token");
    if (!token) {
      token = "admin"; // Asigna 'admin' si token es null o undefined
      console.log("Probando", token);
    }
    return token;
  } catch (error) {
    console.error("Error fetching token: ", error);
  }
};
