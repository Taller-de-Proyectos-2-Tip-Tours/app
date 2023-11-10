import { API_URL_TOURS } from "../service/Const";
import {
  fetchDataFromApi,
} from "../service/repositories/toursRespository";

export const getToursUseCase = async (filters) => {
  try {
    let openFilter = { state: "abierto" , dateState: "abierto"};
    console.log(`Executing getToursUseCase with filters: ${JSON.stringify({ ...openFilter, ...filters })}`);
    const data = await fetchDataFromApi(API_URL_TOURS, { ...openFilter, ...filters });
     
    // Mapeamos sobre los datos y llamamos a una función para obtener los comentarios
     const toursWithComments = await Promise.all(data.map(async (item) => {
      return {
        id: item._id.$oid,
        name: item.name,
        duration: item.duration,
        description: item.description,
        considerations: item.considerations,
        maxCapacity: item.maxParticipants,
        city: item.city,
        language: item.language ? item.language : "Español",
        guideName: "Juan Perez",
        availableDates:
          item.dates?.map((bookings) => ({
            people: item.maxParticipants - bookings.people,
            state: bookings.state,
            date: bookings.date,
          })) || [],
        mainPhoto: item.mainImage,
        extraPhotos: item.otherImages,
        meetingPointDescription: item.meetingPoint,
        stops: item.stops,
      };
    }));

    return toursWithComments;
  } catch (error) {
    console.log(`Error on getToursUseCase ${error}`);
    throw error;
  }
};
