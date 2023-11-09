import * as Calendar from "expo-calendar";

import moment from "moment";
import Toast from "react-native-toast-message";


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

const addCalendarEvent = async (config) => {
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

export const addEventUseCase = async (name, reservedDate, duration) => {
  const startDate = moment(reservedDate);
  const endDate = moment(reservedDate);
  const [hours, minutes] = duration.split(":").map((str) => parseInt(str, 10));
  endDate.add(hours, "hours").add(minutes, "minutes");
  let config = {
    title: name,
    startDate: startDate.toDate(),
    endDate: endDate.toDate(),
    location: tourDetail.meetingPoint,
    alarms: [{ relativeOffset: -15, method: Calendar.AlarmMethod.DEFAULT }],
  };
  await addCalendarEvent(config);
};
