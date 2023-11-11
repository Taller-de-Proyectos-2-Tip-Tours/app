export const navigateToReseverUseCase = (navigationRef, data, clearStack) => {
  const { tourId, date, reserveId, state } = data;
  if (clearStack) {
    navigationRef.replace("Home");
  }

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
