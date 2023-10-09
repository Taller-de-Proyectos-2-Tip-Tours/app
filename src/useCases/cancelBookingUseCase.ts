import { API_URL_RESERVES } from "../service/Const";
import { deleteDataToApi } from "../service/repositories/toursRespository";


export const cancelBookingUseCase = async (id) => {
  try {
    console.log(`Executing cancelBookingUseCase with id: ${id}`);
    const data = await deleteDataToApi(
      API_URL_RESERVES + `/${id}`,
      undefined,
      undefined
    );
    return data;
  } catch (error) {
    console.log(`Error on cancelBookingUseCase ${error.message}`);
    throw error;
  }
};
