import { API_URL_RESERVES, serializeQuerys } from "../Const";

export const fetchDataFromApi = async (queryParams) => {
  try {
    const response = await fetch(API_URL_RESERVES + serializeQuerys(queryParams), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Cache-Control": "no-cache"
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
