import { API_URL_TOURS, serializeQuerys } from "../Const";

export const fetchDataFromApi = async (url, queryParams) => {
  try {
    console.log(`fetchDataFromApi ${url + serializeQuerys(queryParams)}`);
    const response = await fetch(url + serializeQuerys(queryParams), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    let responseJson = await response.json();
    if (!response.ok) {
      throw Error(`${responseJson.error}`);
    }
    return responseJson
  } catch (error) {
    throw error;
  }
};


export const postDataToApi = async (url, queryParams, body) => {
  try {
    console.log(`postDataToApi to ${url} with ${serializeQuerys(queryParams)} and body : ${JSON.stringify(body)}`);
    const response = await fetch(url + serializeQuerys(queryParams), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(body)
    });
    let responseJson = await response.json();
    if (!response.ok) {
      throw Error(`${responseJson.error}`);
    }
    return responseJson
  } catch (error) {
    throw error;
  }
};


export const deleteDataToApi = async (url, queryParams, body) => {
  try {
    const response = await fetch(url + serializeQuerys(queryParams), {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(body)
    });
    let responseJson = await response.json();
    if (!response.ok) {
      throw Error(`${responseJson.error}`);
    }
    return responseJson
  } catch (error) {
    throw error;
  }
};