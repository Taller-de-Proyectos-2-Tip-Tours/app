import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { fetchDataFromApi } from "../service/repositories/reserveRepository";

export const getReserves = async () => {
  try {
    const currentUser = await GoogleSignin.getCurrentUser();
    let request = {
      travelerEmail: currentUser.user.email,
    };
    console.log(`Executing getReserves with query: ${JSON.stringify(request)}`);
    const data = await fetchDataFromApi(request);

    return data.map((item) => ({
      id: item._id.$oid,
      tourId: item.tourId,
      date: item.date,
      people: item.people,
      name: item.tourName,
    }));
  } catch (error) {
    console.log(`Error on getMyReserves ${error}`);
    throw error;
  }
};
