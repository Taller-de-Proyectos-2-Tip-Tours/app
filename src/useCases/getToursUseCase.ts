import { API_URL_RESERVES, API_URL_TOURS } from "../service/Const";
import { fetchDataFromApi, postDataToApi } from "../service/repositories/toursRespository";
import { formatDate } from "./utils";

export const getToursUseCase = async (filters) => {
  try {
    const data = await fetchDataFromApi(filters);
    return data.map((item) => (
      {
        "id": item._id.$oid,
        "name":  item.name,
        "duration": item.duration,
        "description": item.description,
        "considerations": item.considerations,
        "maxCapacity": item.maxParticipants,
        "city": item.city,
        "language": item.language ? item.language : "Español",
        "guideName": "Juan Perez",
        "numRatings": 25,
        "averageRating": 4.5,
        "availableDates": item.dates?.map((bookings) => (
          {
            "people": bookings.people,
            "state": bookings.state,
            "date": bookings.date
          })
        ) || [],
        "mainPhoto": item.mainImage,
        "extraPhotos": item.otherImages,
        "meetingPointDescription": item.meetingPoint,
        "lat": item.lat,
        "lon": item.lon,
        "comments": [
          {
            "user": "Juan Perez",
            "comment": "Esta super bien, lo recomiendo."
          },
          {
            "user": "Lucas Rodriguez",
            "comment": "El guia no me parecio muy interesado en el tema."
          }
        ]
      }        
    ));;
  } catch (error) {
    console.log(`Error on getToursUseCase ${error}`);
    throw error;
  }
};


export const postBookingUseCase = async (body) => {
  try {
    console.log(`postBookingUseCase ${JSON.stringify(body)}`);
    const data = await postDataToApi(API_URL_RESERVES, undefined, body);
    return data
  } catch (error) {
    console.log(`Error on postBookingUseCase ${JSON.stringify(error)}`);
    throw error;
  }
};
