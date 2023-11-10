import { API_URL_TOURS, API_URL_REVIEWS } from "../service/Const";
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
      // Aquí puedes llamar a una función para obtener los comentarios de cada tour
      let totalRatings = 0;
      let totalRatingValue = 0;
      let activeFilter = { state: "active" };
      const comments = await fetchDataFromApi(API_URL_REVIEWS+ `/${item._id.$oid}`, { ...activeFilter });
      comments.forEach((comment) => {
        totalRatings++;
        totalRatingValue += comment.stars; 
      });
      const averageRating = totalRatings > 0 ? totalRatingValue / totalRatings : 0;
  
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
        numRatings: totalRatings,
        averageRating: averageRating,
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
    let totalRatings = 0;
    let totalRatingValue = 0;
    console.log(`Executing getTourUseCase with id: ${id})}`);
    const item = await fetchDataFromApi(API_URL_TOURS + `/${id}`, undefined);
    let activeFilter = { state: "active" };
    const comments = await fetchDataFromApi(API_URL_REVIEWS+ `/${id}`, { ...activeFilter });
    comments.forEach((comment) => {
      totalRatings++;
      totalRatingValue += comment.stars; 
    });
    const averageRating = totalRatings > 0 ? totalRatingValue / totalRatings : 0;

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
      numRatings: totalRatings,
      averageRating: averageRating,
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
    console.log(`Error on getTourUseCase ${error}`);
    throw error;
  }
};

export async function getTourBasicUseCase (id) {
  try {
    let totalRatings = 0;
    let totalRatingValue = 0;
    console.log(`Executing getBasicTourUseCase with id: ${id})}`);
    const item = await fetchDataFromApi(API_URL_TOURS + `/${id}`, undefined);
       
    return {
      id: item._id.$oid,
      name: item.name,
      mainImage: item.mainImage,
    };
  } catch (error) {
    console.log(`Error on getBasicTourUseCase ${error}`);
    throw error;
  }
};
