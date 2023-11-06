import { API_URL_CITIES } from "../service/Const";
import { fetchDataFromApi } from "../service/repositories/toursRespository";

export const getCitiesUseCase = async () => {
  try {
    const data = await fetchDataFromApi(API_URL_CITIES, undefined);
    return data.map((item) => (
      {
        "id": item._id.$oid,
        "name": item.name
      }));
  } catch (error) {
    console.log(`Error on getCitiesUseCase ${error}`);
    throw error;
  }
};
