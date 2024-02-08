import { useState, FC } from "react";
import style from "./CommonUsed.module.css";
import { IDates, useDateContext } from "../../../context/context";
import { formatForCommonUsed } from "../../../utils/helpers";

const commonItems = [
  "Сегодня",
  "Вчера",
  "Эта неделя",
  "Этот месяц",
  "Этот год",
  "С начала года",
  "C начала месяца",
  "С начала недели",
];

export const CommonUsed: FC = () => {
  const [selectedItem, setSelectedItem] = useState("");

  const { setChoosenFormatedDate, addUniqueRange } = useDateContext();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    const formatedDate = formatForCommonUsed(item);
    setChoosenFormatedDate(formatedDate as IDates);
    addUniqueRange(item);
  };

  return (
    <>
      <h2 className={style.title}>Обычно используется</h2>
      <ul className={style.container}>
        {commonItems.map((item) => (
          <li
            key={item}
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
