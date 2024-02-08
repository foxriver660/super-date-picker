export function updateDateTime(date, time) {
  const [hours, minutes] = time.split(":");
  const updatedDate = new Date(date);
  updatedDate.setHours(Number(hours));
  updatedDate.setMinutes(Number(minutes));
  return updatedDate;
}
