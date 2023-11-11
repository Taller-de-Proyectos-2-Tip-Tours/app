import { API_URL_TOURS } from "../service/Const";
import { fetchDataFromApi } from "../service/repositories/toursRespository";

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
      guideName: item.guide.name ? item.guide.name : "Juan Perez",
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
  } catch (error) {
    console.log(`Error on getToursUseCase ${error}`);
    throw error;
  }
};
