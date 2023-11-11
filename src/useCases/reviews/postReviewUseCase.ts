import { API_URL_REVIEWS } from "../../service/Const";
import { postDataToApi } from "../../service/repositories/toursRespository";

export const postReviewUseCase = async (tourId, body) => {
  try {
    console.log(
      `Executing postReviewUseCase with request: ${JSON.stringify(body)}`
    );
    const data = await postDataToApi(
      `${API_URL_REVIEWS}/${tourId}`,
      undefined,
      body
    );
    return data;
  } catch (error) {
    console.log(`Error on postReviewUseCase ${error.message}`);
    throw error;
  }
};
