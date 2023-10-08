import { API_URL_TOURS, serializeQuerys } from "../Const";

export const fetchDataFromApi = async (queryParams) => {
  try {
    const response = await fetch(API_URL_TOURS + serializeQuerys(queryParams), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(`Error response on fetchDataFromApi ${response}`);
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};


export const postDataToApi = async (url, queryParams, body) => {
  try {
    const response = await fetch(url + serializeQuerys(queryParams), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      console.log(`Error response on postDataToApi ${JSON.stringify(response)}`);
      throw new Error("Network response was not ok");
    }
    return await response.json();
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
    if (!response.ok) {
      console.log(`Error response on deleteDataToApi ${JSON.stringify(response)}`);
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};