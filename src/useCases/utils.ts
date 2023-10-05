export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateFormatted = date.toLocaleDateString('en-US', options);
    const timeFormatted = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
    return {
      date: dateFormatted,
      time: timeFormatted,
    };
  }

  export const transformDateToString = (item) => {
    let formated = formatDate(item);
    return `${formated.date} - ${formated.time}`;
  }