export const navigateToTourUseCase = (navigationRef, tourId, clearStack) => {
  if (clearStack) {
    navigationRef.replace("Home");
  }
  navigationRef.navigate("Home", {
    screen: "toursTab",
    params: {
      screen: "TourDetail",
      params: {
        tourId: tourId,
      },
    },
  });
};
