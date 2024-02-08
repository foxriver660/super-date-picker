/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, FC } from "react";
import style from "./AddPopup.module.css";
import { Tab } from "../../UI";
import { AbsoluteTab } from "./AbsoluteTab/AbsoluteTab";
import { RelativeTab } from "./RelativeTab/RelativeTab";
import { useDateContext } from "../../context";
import { updateDateTime, formatTime } from "../../utils/helpers";

interface IAddPopup {
  startingPoint: "start" | "end";
}

export const AddPopup: FC<IAddPopup> = ({ startingPoint }) => {
  const { setIsUpdate, choosenFormatedDate, setChoosenFormatedDate } =
    useDateContext();
  const dateToUse =
    startingPoint === "start"
      ? choosenFormatedDate.startDate
      : choosenFormatedDate.endDate;
  const [current, setCurrent] = useState("absolute");
  const [selectedDate, setSelectedDay] = useState(dateToUse);
  const [selectedTime, setTime] = useState(formatTime(dateToUse));

  useEffect(() => {
    setIsUpdate((prev) => !prev);
    setChoosenFormatedDate(
      startingPoint === "start"
        ? {
            ...choosenFormatedDate,
            startDate: updateDateTime(selectedDate, selectedTime),
          }
        : {
            ...choosenFormatedDate,
            endDate: updateDateTime(selectedDate, selectedTime),
          }
    );
  }, [selectedDate && selectedTime]);

  return (
    <>
      <div className={style.tabContainer}>
        <Tab
          value="absolute"
          active={current === "absolute"}
          onClick={() => setCurrent("absolute")}
        >
          Абсолютное
        </Tab>
        <Tab
          value="relative"
          active={current === "relative"}
          onClick={() => setCurrent("relative")}
        >
          Относительное
        </Tab>
      </div>
      {current === "absolute" && (
        <AbsoluteTab
          setSelectedDay={setSelectedDay}
          startingPoint={startingPoint}
          setSelectTime={setTime}
        />
      )}
      {current === "relative" && <RelativeTab startingPoint={startingPoint} />}
    </>
  );
};
