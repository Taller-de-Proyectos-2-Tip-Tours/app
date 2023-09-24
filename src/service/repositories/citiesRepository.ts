import { API_URL_CITIES } from "../Const";

export const fetchCitiesFromApi = async () => {
    try {
      const response = await fetch(API_URL_CITIES, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        console.log(`Error response on fetchCitiesFromApi ${response}`);
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  