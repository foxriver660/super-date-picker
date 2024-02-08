import { FC } from "react";
import "./DateContainer.css";

interface IDateContainer {
  startingPoint: "start" | "end";
  date: string;
  time: string;
}

export const DateContainer: FC<IDateContainer> = ({
  startingPoint,
  date,
  time,
}) => {
  return (
    <div className="dateContainer">
      <span className="accent">
        {startingPoint === "start" ? "Начальная дата:" : "Конечная дата:"}
      </span>
      <span>
        {date}/{time}
      </span>
    </div>
  );
};
