import { serializeQuerys } from "../Const";
import { getToken } from "../../useCases/login/getToken";

const getHeaders = async () => {
  let token = await getToken();
  let headers = {
    Accept: "application/json",
    "Content-type": "application/json",
    token: token,
    Authorization : `Bearer ${"e2d8b11150251d6111f74746eba5fef6"}`
  }
  return headers
}

export const fetchDataFromApi = async (url, queryParams) => {
  try {
    console.log(`fetchDataFromApi ${url + serializeQuerys(queryParams)}`);
    const response = await fetch(url + serializeQuerys(queryParams), {
      method: "GET",
      headers: await getHeaders(),
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
    let headers = await getHeaders()
    const response = await fetch(url + serializeQuerys(queryParams), {
      method: "POST",
      headers: {...headers, "Cache-Control": "no-cache" },
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
    const response = await fetch(url + serializeQuerys(queryParams), {
      method: "DELETE",
      headers: await getHeaders(),
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
