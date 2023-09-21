import { fetchDataFromApi } from "../service/repositories/toursRespository";

export const getToursUseCase = async () => {
  try {
    const data = await fetchDataFromApi();
    console.log(`getToursUseCase data: ${JSON.stringify(data)}`);
    return data.map((item) => ({
      id: item._id.$oid,
      name: item["name"],
      city: item["city"],
      description: item["description"],
    }));;
  } catch (error) {
    throw error;
  }
};
