export function formatForCommonUsed(selectedRange) {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
    0
  );
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
    999
  );

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const startOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate(),
    0,
    0,
    0,
    0
  );
  const endOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate(),
    23,
    59,
    59,
    999
  );

  const startOfThisWeek = new Date(today);
  startOfThisWeek.setDate(startOfThisWeek.getDate() - startOfThisWeek.getDay());
  startOfThisWeek.setHours(0, 0, 0, 0);
  const endOfThisWeek = new Date(today);
  endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);
  endOfThisWeek.setHours(23, 59, 59, 999);

  const startOfThisMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
    0,
    0,
    0,
    0
  );
  const endOfThisMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  const startOfThisYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
  const endOfThisYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

  if (selectedRange === "Сегодня") {
    return { startDate: startOfToday, endDate: endOfToday };
  } else if (selectedRange === "Вчера") {
    return { startDate: startOfYesterday, endDate: endOfYesterday };
  } else if (selectedRange === "Эта неделя") {
    return { startDate: startOfThisWeek, endDate: endOfThisWeek };
  } else if (selectedRange === "Этот месяц") {
    return { startDate: startOfThisMonth, endDate: endOfThisMonth };
  } else if (selectedRange === "Этот год") {
    return { startDate: startOfThisYear, endDate: endOfThisYear };
  } else if (selectedRange === "С начала года") {
    return { startDate: startOfThisYear, endDate: endOfToday };
  } else if (selectedRange === "C начала месяца") {
    return { startDate: startOfThisMonth, endDate: endOfToday };
  } else if (selectedRange === "С начала недели") {
    return { startDate: startOfThisWeek, endDate: endOfToday };
  }

  return { startDate: null, endDate: null };
}
