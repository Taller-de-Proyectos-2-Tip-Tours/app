export const navigateToReseverUseCase = (navigationRef, data) => {
  const { tourId, date, reserveId, state } = data;
  navigationRef.replace("Home");
  navigationRef.navigate("Home", {
    screen: "bookingTab",
    params: {
      screen: "ReserveDetail",
      params: {
        tourId: tourId,
        reservedDate: date,
        reserveId: reserveId,
        reserveState: state,
        isReserve: true,
      },
    },
  });
};
