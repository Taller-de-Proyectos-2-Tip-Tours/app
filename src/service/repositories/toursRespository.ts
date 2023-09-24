import { API_URL_TOURS } from "../Const";

export const fetchDataFromApi = async (queryParams) => {
  try {
    var queryString = "";
    if(queryParams === undefined) {
      queryString = ""
    } else {
      queryString = Object.keys(queryParams)
      .map((key) => {
        const value = queryParams[key];
        if (value !== undefined) {
          return `${key}=${encodeURIComponent(value)}`;
        }
        return null; // Skip undefined values
      })
      .filter((param) => param !== null) // Remove null values
      .join("&");
      queryString = `?${queryString}`
    }

    
    const response = await fetch(API_URL_TOURS + queryString, {
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
