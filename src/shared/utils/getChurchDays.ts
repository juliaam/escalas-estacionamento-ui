import { eachDayOfInterval, endOfMonth, getDay, startOfMonth } from "date-fns";

export const filterWedsnesdayAndSundaysInMonth = (date?: Date) => {
  const start = startOfMonth(date ?? new Date());
  const end = endOfMonth(date ?? new Date());

  return eachDayOfInterval({ start, end }).filter((date) => {
    const dayOfWeek = getDay(date);
    return dayOfWeek !== 3 && dayOfWeek !== 0;
  });
};

export const getWedsnesdayAndSundaysInMonth = (date?: Date) => {
  const start = startOfMonth(date ?? new Date());
  const end = endOfMonth(date ?? new Date());

  return eachDayOfInterval({ start, end }).filter((date) => {
    const dayOfWeek = getDay(date);
    return dayOfWeek === 3 || dayOfWeek === 0;
  });
};
