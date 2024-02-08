/* eslint-disable @typescript-eslint/no-unused-vars */
export const reverseParseDate = (stringDate) => {
  const russianMonths = {
    "янв.": "January",
    "февр.": "February",
    "апр.": "April",
    "авг.": "August",
    "сент.": "September",
    "окт.": "October",
    "нояб.": "November",
    "дек.": "December",
    март: "March",
    май: "May",
    июнь: "June",
    июль: "July",
  };

  if (stringDate.date) {
    const [_, day, monthAbbr, year] = stringDate.date.split(" ");
    const month = russianMonths[monthAbbr];
    const dateTimeStr = `${month} ${day}, ${year} ${stringDate.time}`;
    const date = new Date(dateTimeStr);
    return date;
  }
};
