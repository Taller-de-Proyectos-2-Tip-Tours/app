import { fetchDataFromApi } from "../service/repositories/toursRespository";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const dateFormatted = date.toLocaleDateString('en-US', options);
  const timeFormatted = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return {
    date: dateFormatted,
    time: timeFormatted,
  };
}

export const getToursUseCase = async (filters) => {
  try {
    const data = await fetchDataFromApi(filters);
    return data.map((item) => (
      {
        "id": item._id.$oid,
        "name":  item.name,
        "duration": item.duration,
        "description": item.description,
        "maxCapacity": 20,
        "city": item.city,
        "language": item.lenguage,
        "guideName": "Juan Perez",
        "numRatings": 25,
        "averageRating": 4.5,
        "availableDates": item.dates?.map((date) => formatDate(date)) || [],
        "mainPhoto": item.mainImage,
        "extraPhotos": item.otherImages,
        "mapPrototype": "map-prototype.jpg",
        "meetingPointDescription": item.meetingPoint,
        "comments": [
          {
            "user": "Alice",
            "comment": "The views were amazing!"
          },
          {
            "user": "Bob",
            "comment": "Great guide, very knowledgeable."
          },
          {
            "user": "Eve",
            "comment": "I had a fantastic time on this hike."
          }
        ]
      }        
    ));;
  } catch (error) {
    console.log(`Error on getToursUseCase ${error}`);
    throw error;
  }
};
