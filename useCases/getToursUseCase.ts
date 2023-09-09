import { fetchDataFromApi } from "../service/repositories/toursRespository";

export const getToursUseCase = async () => {
  try {
    const data = await fetchDataFromApi();
    console.log(`getToursUseCase data: ${JSON.stringify(data)}`);
    return data.map((item) => ({
      id: item._id.$oid,
      start_date: item["Fecha de inicio"],
      duration: item["Duracion"],
      location: item["Ubicacion"],
      guide: item["Guia"],
      description: item["Descripcion"],
      limit: item["Cupo"],
      state: item["Estado"],
    }));;
  } catch (error) {
    throw error;
  }
};
