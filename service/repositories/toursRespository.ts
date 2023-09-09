import { API_URL_TOURS } from "../Const";

export const fetchDataFromApi = async () => {
  try {
    const response = await fetch(API_URL_TOURS, {
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
    return await response.json();;
  } catch (error) {
    throw error;
  }
};
