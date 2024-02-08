export function formatForQuickSelect({ selectedOrder, gradation, number }) {
  const currentDate = new Date();
  let endDate;
  let startDate;

  if (selectedOrder === "next") {
    endDate = new Date(currentDate);
    if (gradation === "minutes") {
      endDate.setMinutes(currentDate.getMinutes() + parseInt(number));
    } else if (gradation === "hours") {
      endDate.setHours(currentDate.getHours() + parseInt(number));
    } else if (gradation === "days") {
      endDate.setDate(currentDate.getDate() + parseInt(number));
    } else if (gradation === "months") {
      endDate.setMonth(currentDate.getMonth() + parseInt(number));
    } else if (gradation === "years") {
      endDate.setFullYear(currentDate.getFullYear() + parseInt(number));
    }
    startDate = new Date(currentDate);
  } else if (selectedOrder === "previous") {
    startDate = new Date(currentDate);
    if (gradation === "minutes") {
      startDate.setMinutes(currentDate.getMinutes() - parseInt(number));
    } else if (gradation === "hours") {
      startDate.setHours(currentDate.getHours() - parseInt(number));
    } else if (gradation === "days") {
      startDate.setDate(currentDate.getDate() - parseInt(number));
    } else if (gradation === "months") {
      startDate.setMonth(currentDate.getMonth() - parseInt(number));
    } else if (gradation === "years") {
      startDate.setFullYear(currentDate.getFullYear() - parseInt(number));
    }
    endDate = new Date(currentDate);
  }

  return { startDate, endDate };
}
