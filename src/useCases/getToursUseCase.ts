import { API_URL_TOURS, API_URL_REVIEWS } from "../service/Const";
import {
  fetchDataFromApi,
} from "../service/repositories/toursRespository";
import {
  fetchReviewsFromApi,
} from "../service/repositories/reviewsRepository";

export const getToursUseCase = async (filters) => {
  try {
    //let openFilter = { dateState: "abierto" };
    let openFilter = { state: "abierto" };
    console.log(`Executing getToursUseCase with filters: ${JSON.stringify({ ...openFilter, ...filters })}`);
    const data = await fetchDataFromApi(API_URL_TOURS, { ...openFilter, ...filters });
     
    // Mapeamos sobre los datos y llamamos a una función para obtener los comentarios
     const toursWithComments = await Promise.all(data.map(async (item) => {
      // Aquí puedes llamar a una función para obtener los comentarios de cada tour
      const comments = await fetchReviewsFromApi(API_URL_REVIEWS+ `/${item._id.$oid}`, undefined);
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
        comments: comments,
      };
    }));

    return toursWithComments;
  } catch (error) {
    console.log(`Error on getToursUseCase ${error}`);
    throw error;
  }
};

export const getTourUseCase = async (id) => {
  try {
    console.log(`Executing getTourUseCase with id: ${id})}`);
    const item = await fetchDataFromApi(API_URL_TOURS + `/${id}`, undefined);
    const comments = await fetchReviewsFromApi(API_URL_REVIEWS+ `/${id}`, undefined); 
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
      comments: comments
    };
  } catch (error) {
    console.log(`Error on getToursUseCase ${error}`);
    throw error;
  }
};

