export const datesWithDays = () => {
  const current = new Date();
  const currentDay = current.getDay(); // 0 (Sun) - 6 (Sat)
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(current);
  monday.setDate(current.getDate() + diffToMonday);

  const weekDates = [];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    weekDates.push({
      date: day.toLocaleString().split(",")[0],
      day: weekdays[day.getDay()],
    });
  }
  // console.log(weekDates);
  return weekDates;
};
