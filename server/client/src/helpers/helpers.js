export const timestampToDate = (timestamp) => {
  let date = new Date(parseFloat(timestamp * 1000));
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`;
};

export const timestampToSimpleDate = (timestamp) => {
  let date = new Date(parseInt(timestamp * 1000));
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const weekdaysBeforeToday = () => {
  let weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let date = new Date().getDay();
  return weekdayNames.splice(date + 1, 7 - date - 1).concat(weekdayNames);
}

export const getDateXDaysAgo = (x) => {
  let date = new Date();
  date.setDate(date.getDate() - x);
  return String(Math.round(date.getTime() / 1000));
}

export const getFirstWeekDay = () => {
  let startDate = new Date();
  startDate.setDate(1);
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }
  return startDate;
}
export const getWeeks = () => {
  let date = new Date();
  let weeks = [];
  let startDate = getFirstWeekDay();
  while (startDate < date) {
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    weeks.push({
      start: new Date(startDate),
      end: endDate,
      label: `${startDate.getDate()}-${endDate.getDate()}`,
    });
    startDate.setDate(startDate.getDate() + 7);
  }
  return weeks;
}

export const sumPartialAmounts = (items, prop) => {
  return items.reduce((a, b) => {
    return parseFloat(a) + parseFloat(b[prop]);
  }, 0);
};

export const today = () => {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
