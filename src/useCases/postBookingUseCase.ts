import { API_URL_RESERVES } from "../service/Const";
import { postDataToApi } from "../service/repositories/toursRespository";


export const postBookingUseCase = async (body) => {
  try {
    console.log(`Executing postBookingUseCase with request: ${JSON.stringify(body)}`);
    const data = await postDataToApi(API_URL_RESERVES, undefined, body);
    return data;
  } catch (error) {
    console.log(`Error on postBookingUseCase ${error.message}`);
    throw error;
  }
};
