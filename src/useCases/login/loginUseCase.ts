import { API_URL_LOGIN } from "../../service/Const";
import { postDataToApi } from "../../service/repositories/toursRespository";


export const loginUseCase = async (email, token) => {
  try {
    let body = {
      userEmail: email,
      deviceToken: token
    }
    console.log("Executing loginUseCase with body: " + JSON.stringify(body));
    const data = await postDataToApi(API_URL_LOGIN, undefined, body);
    return data;
  } catch (error) {
    console.log(`Error on loginUseCase ${error.message}`);
    throw error;
  }
}