import * as Calendar from "expo-calendar";

import moment from "moment";
import Toast from "react-native-toast-message";

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const dateFormatted = date.toLocaleDateString("es-ES", options);
  const timeFormatted = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    date: dateFormatted,
    time: timeFormatted,
  };
}

export const transformDateToString = (item) => {
  let formated = formatDate(item);
  return `${formated.date} - ${formated.time}`;
};

export const transformDateToString_2 = (item) => {
  let formated = formatDate(item);
  return `${formated.date}`;
};

const obtainCalendarPermission = async () => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== "granted") {
    alert("Se necesita permisos para agregar un evento a tu calendario.");
  }
};

async function createCalendar() {
  const defaultCalendarSource = {
    id: "codecrafter",
    isLocalAccount: false,
    name: "TipTour",
  };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "Paseos",
    color: "blue",
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

export const addCalendarEvent = async (config) => {
  console.log(`Adding event to calendar ${JSON.stringify(config)}`);
  await obtainCalendarPermission();
  console.log("Permission granted");
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );
  const calendar = calendars.length > 0 ? calendars[0] : await createCalendar();
  console.log(`Adding event to alendar obtained ${JSON.stringify(calendar)}`);
  await Calendar.createEventAsync(calendar.id, config).then(() => {
    Toast.show({
      type: "success", // 'success', 'error', 'info', 'warning'
      position: "bottom", // 'top', 'bottom', 'center'
      text1: "Evento agregado a tu calendario",
      visibilityTime: 3000, // Duration in milliseconds
    });
  });
};
