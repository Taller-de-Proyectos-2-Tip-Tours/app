import { API_URL_REVIEWS, serializeQuerys } from "../Const";

export const fetchReviewsFromApi = async (url, queryParams) => {
  try {
    console.log(`fetchReviewsFromApi ${url + serializeQuerys(queryParams)}`);
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

// export const fetchReviewsFromApi = async (queryParams) => {
//   try {
//     const response = await fetch(API_URL_REVIEWS + serializeQuerys(queryParams), {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       console.log(`Error response on fetchReviewsFromApi ${response}`);
//       throw new Error("Network response was not ok");
//     }
//     return await response.json();
//   } catch (error) {
//     throw error;
//   }
// };
