import { serializeQuerys } from "../Const";
import { getToken } from "../../useCases/login/getToken";

export const fetchDataFromApi = async (url, queryParams) => {
  try {
    console.log(`fetchDataFromApi ${url + serializeQuerys(queryParams)}`);
    let token = await getToken();
    const response = await fetch(url + serializeQuerys(queryParams), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        token: token,
      },
    });
    let responseJson = await response.json();
    if (!response.ok) {
      console.log(`fetchDataFromApi response ${JSON.stringify(responseJson)}`);
      throw Error(`${responseJson.error}`);
    }
    return responseJson;
  } catch (error) {
    console.log(`fetchDataFromApi error ${error}`);
    throw error;
  }
};

export const postDataToApi = async (url, queryParams, body) => {
  try {
    console.log(
      `postDataToApi to ${url} with queries param: ${serializeQuerys(
        queryParams
      )} and body : ${JSON.stringify(body)}`
    );
    let token = await getToken();
    const response = await fetch(url + serializeQuerys(queryParams), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Cache-Control": "no-cache",
        token: token,
      },
      body: JSON.stringify(body),
    });
    let responseJson = await response.json();
    if (!response.ok) {
      console.log(`postDataToApi response ${JSON.stringify(responseJson)}`);
      throw Error(
        `${responseJson.error ? responseJson.error : responseJson._schema[0]}`
      );
    }
    return responseJson;
  } catch (error) {
    throw error;
  }
};

export const deleteDataToApi = async (url, queryParams, body) => {
  try {
    let token = await getToken();
    const response = await fetch(url + serializeQuerys(queryParams), {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        token: token,
      },
      body: JSON.stringify(body),
    });
    let responseJson = await response.json();
    if (!response.ok) {
      console.log(`deleteDataToApi response ${JSON.stringify(responseJson)}`);
      throw Error(
        `${responseJson.error ? responseJson.error : responseJson._schema[0]}`
      );
    }
    return responseJson;
  } catch (error) {
    throw error;
  }
};
