import { fetchCitiesFromApi } from "../service/repositories/citiesRepository";

export const getCitiesUseCase = async () => {
  try {
    const data = await  fetchCitiesFromApi();
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
