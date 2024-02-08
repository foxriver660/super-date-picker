/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { useState, useEffect } from "react";
import style from "./RecentlyUsed.module.css";
import { IDates, useDateContext } from "../../../context";
import { formatForCommonUsed, reverseParseDate, formatDateFromRelative } from "../../../utils/helpers";


export const RecentlyUsed = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const { choosenRange, addUniqueRange, setChoosenFormatedDate } =
    useDateContext();
    
  const regexForRange = /\→+/;
  const regexForRelative = /(Следующие|Предыдущие)/i;

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    if (regexForRange.test(selectedItem)) {
      const arr = selectedItem.split("→").map((item) => item.split("/"));
      const dateStart = { date: arr[0][0], time: arr[0][1] };
      const dateEnd = { date: arr[1][0], time: arr[1][1] };
      const test = reverseParseDate(dateStart);
      const formatedDate = {
        startDate: test,
        endDate: reverseParseDate(dateEnd),
      };
      setChoosenFormatedDate(formatedDate as IDates);
    } else if (regexForRelative.test(selectedItem)) {
      addUniqueRange(selectedItem);
      const formatedDate = formatDateFromRelative(selectedItem);
      setChoosenFormatedDate(formatedDate as IDates);
    } else if (selectedItem) {
      addUniqueRange(selectedItem);
      const formatedDate = formatForCommonUsed(selectedItem);
      setChoosenFormatedDate(formatedDate as IDates);
    }
  }, [selectedItem]);

  return (
    <>
      <h2 className={style.title}>
        Недавно использованные временные диапазоны
      </h2>
      <ul className={style.container}>
        {choosenRange.map((item, index) => (
          <li
            key={index}
            onClick={() => handleItemClick(item)}
            className={`${style.item} ${
              selectedItem === item ? style.selected : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
