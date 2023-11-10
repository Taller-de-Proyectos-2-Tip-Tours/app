import { API_URL_TOURS } from "../service/Const";
import { fetchDataFromApi } from "../service/repositories/toursRespository";

export async function getTourBasicUseCase(id) {
  try {
    console.log(`Executing getTourBasicUseCase with id: ${id})}`);
    const item = await fetchDataFromApi(API_URL_TOURS + `/${id}`, undefined);

    return {
      id: item._id.$oid,
      name: item.name,
      mainImage: item.mainImage,
    };
  } catch (error) {
    console.log(`Error on getTourBasicUseCase ${error}`);
    throw error;
  }
}
