/* eslint-disable prefer-const */
export const formatTimeForAbsolute = (time) => {
  let { hour, minute, period } = time;
  if (period === "PM" && hour !== "12") {
    hour = (parseInt(hour, 10) + 12).toString();
  } else if (period === "AM" && hour === "12") {
    hour = "00";
  }

  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
};
