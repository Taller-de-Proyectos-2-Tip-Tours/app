import { API_URL_REVIEWS } from "../../service/Const";
import { fetchDataFromApi } from "../../service/repositories/toursRespository";

export const getReviewsUseCase = async (tour, tourId) => {
  try {
    let activeFilter = { state: "active" };
    let totalRatings = 0;
    let totalRatingValue = 0;
    const comments = await fetchDataFromApi(API_URL_REVIEWS + `/${tourId}`, {
      ...activeFilter,
    });
    comments.forEach((comment) => {
      totalRatings++;
      totalRatingValue += comment.stars;
    });
    const averageRating =
      totalRatings > 0 ? totalRatingValue / totalRatings : 0;

    let result = comments.map((comment) => ({
      ...comment,
      id: comment._id.$oid,
      date: new Date(comment.date),
    }));
    return {
      numRatings: totalRatings,
      averageRating: averageRating,
      comments: result,
      ...tour,
    };
  } catch (error) {
    console.log(`Error on getReviewsUseCase ${error}`);
    throw error;
  }
};
