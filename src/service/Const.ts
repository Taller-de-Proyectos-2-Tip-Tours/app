

export const API_URL = 'https://tdp2-backend.onrender.com';

export const API_URL_TOURS = `${API_URL}/tours`;
export const API_URL_CITIES = `${API_URL}/cities`;
export const API_URL_RESERVES = `${API_URL}/reserves`;
export const API_URL_REVIEWS = `${API_URL}/reviews`;
export const API_URL_LOGIN = `${API_URL}/users/login`;

export const serializeQuerys = (queryParams) => {
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
    return queryString
}