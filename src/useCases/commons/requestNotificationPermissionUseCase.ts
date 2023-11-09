import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";

function getToken() {
  messaging()
    .getToken()
    .then((token) => {
      console.log("Token de Firebases: ", token);
    })
    .catch((error) => {
      console.warn(`${error} permission rejected`);
    });
}

export async function requestUserPermissionUseCase() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert(
      "Si quieres recibir notificaciones otorgale el permiso a TipTour desde configuración."
    );
    return;
  }
  getToken();
}
