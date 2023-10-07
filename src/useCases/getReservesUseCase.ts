import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { fetchDataFromApi } from "../service/repositories/reserveRepository";
import { formatDate } from "./utils";

export const getReserves = async () => {
  try {
    const currentUser = await GoogleSignin.getCurrentUser();
    const data = await fetchDataFromApi({
      travelerEmail: currentUser.user.email,
    });
    console.log(data)
  
    return data.map((item) => ({
      "id": item._id.$oid,
      "tourId": item.tourId,
      "date": formatDate(item.date),
      "people": item.people,
    }));
  } catch (error) {
    console.log(`Error on getMyReserves ${error}`);
    throw error;
  }
};
