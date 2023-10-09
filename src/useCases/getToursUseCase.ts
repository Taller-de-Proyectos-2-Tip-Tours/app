import { API_URL_TOURS } from "../service/Const";
import {
  fetchDataFromApi,
} from "../service/repositories/toursRespository";

export const getToursUseCase = async (filters) => {
  try {
    let openFilter = { dateState: "abierto" };
    console.log(`Executing getToursUseCase with filters: ${JSON.stringify({ ...openFilter, ...filters })}`);
    const data = await fetchDataFromApi(API_URL_TOURS, { ...openFilter, ...filters });
    return data.map((item) => ({
      id: item._id.$oid,
      name: item.name,
      duration: item.duration,
      description: item.description,
      considerations: item.considerations,
      maxCapacity: item.maxParticipants,
      city: item.city,
      language: item.language ? item.language : "Español",
      guideName: "Juan Perez",
      numRatings: 25,
      averageRating: 4.5,
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
      comments: [
        {
          user: "Juan Perez",
          comment: "Esta super bien, lo recomiendo.",
        },
        {
          user: "Lucas Rodriguez",
          comment: "El guia no me parecio muy interesado en el tema.",
        },
      ],
    }));
  } catch (error) {
    console.log(`Error on getToursUseCase ${error}`);
    throw error;
  }
};

export const getTourUseCase = async (id) => {
  try {
    console.log(`Executing getTourUseCase with id: ${id})}`);
    const item = await fetchDataFromApi(API_URL_TOURS + `/${id}`, undefined);
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
      numRatings: 25,
      averageRating: 4.5,
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
      comments: [
        {
          user: "Juan Perez",
          comment: "Esta super bien, lo recomiendo.",
        },
        {
          user: "Lucas Rodriguez",
          comment: "El guia no me parecio muy interesado en el tema.",
        },
      ],
    };
  } catch (error) {
    console.log(`Error on getToursUseCase ${error}`);
    throw error;
  }
};

