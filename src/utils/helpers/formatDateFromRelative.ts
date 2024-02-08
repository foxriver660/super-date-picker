export function formatDateFromRelative(str) {
  const parts = str.split(" ");
  const direction = parts[0];
  const amount = parseInt(parts[1]);
  const unit = parts[2];

  const currentDate = new Date();
  const startDate = new Date();
  const endDate = new Date();

  if (direction === "Предыдущие") {
    if (unit === "минут") {
      startDate.setMinutes(currentDate.getMinutes() - amount);
    } else if (unit === "часов") {
      startDate.setHours(currentDate.getHours() - amount);
    } else if (unit === "дней") {
      startDate.setDate(currentDate.getDate() - amount);
    } else if (unit === "месяцев") {
      startDate.setMonth(currentDate.getMonth() - amount);
    } else if (unit === "лет") {
      startDate.setFullYear(currentDate.getFullYear() - amount);
    }
  } else if (direction === "Следующие") {
    if (unit === "минут") {
      endDate.setMinutes(currentDate.getMinutes() + amount);
    } else if (unit === "часов") {
      endDate.setHours(currentDate.getHours() + amount);
    } else if (unit === "дней") {
      endDate.setDate(currentDate.getDate() + amount);
    } else if (unit === "месяцев") {
      endDate.setMonth(currentDate.getMonth() + amount);
    } else if (unit === "лет") {
      endDate.setFullYear(currentDate.getFullYear() + amount);
    }
  }

  if (direction === "Предыдущие") {
    return { startDate: startDate, endDate: currentDate };
  } else if (direction === "Следующие") {
    return { startDate: currentDate, endDate: endDate };
  }
}
