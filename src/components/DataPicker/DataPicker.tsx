/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, FC } from "react";
import style from "./DataPicker.module.css";
import { LuArrowBigRightDash } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { MainPopup } from "../MainPopup/MainPopup";
import { AddPopup } from "../AddPopup/AddPopup";
import { reverseParseDate } from "../../utils/helpers/reverseParseDate";
import { useDateContext } from "../../context/context";
import { formatDate } from "../../utils/helpers";
import { formatTime } from "../../utils/helpers/formatTime";
import Popup from "../../UI/Popup/Popup";
import { IoArrowDown } from "react-icons/io5";

interface SelectedDateTime {
  date: string | null;
  time: string | null;
}

interface IDataPickerProps {
  selectedRange: (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

export const DataPicker: FC<IDataPickerProps> = ({ selectedRange }) => {
  const [isRangeLook, setIsRangeLook] = useState(false);

  const [selectedStart, setSelectedStart] = React.useState<SelectedDateTime>({
    date: null,
    time: null,
  });
  const [selectedEnd, setSelectedEnd] = React.useState<SelectedDateTime>({
    date: null,
    time: null,
  });
  const { isUpdate, choosenRange, addUniqueRange, choosenFormatedDate } =
    useDateContext();

  useEffect(() => {
    setSelectedStart({
      date: formatDate(
        choosenFormatedDate.startDate as Date,
        "DDD DD MMM YYYY"
      ),
      time: formatTime(choosenFormatedDate.startDate) as string,
    });
    setSelectedEnd({
      date: formatDate(choosenFormatedDate.endDate as Date, "DDD DD MMM YYYY"),
      time: formatTime(choosenFormatedDate.endDate) as string,
    });
    selectedRange(choosenFormatedDate);
  }, [choosenFormatedDate]);

  const parsedStartDate = reverseParseDate(selectedStart);
  const parsedEndDate = reverseParseDate(selectedEnd);
  const isStartDateGreaterThanEndDate =
    parsedStartDate && parsedEndDate && parsedStartDate > parsedEndDate;

  useEffect(() => {
    selectedStart.date &&
      !isStartDateGreaterThanEndDate &&
      console.log("ЗАПИСАЛО", selectedStart, choosenFormatedDate);
    selectedStart.date &&
      !isStartDateGreaterThanEndDate &&
      addUniqueRange(
        `${selectedStart.date}/${selectedStart.time}→${selectedEnd.date}/${selectedEnd.time}`
      );
  }, [selectedStart && selectedEnd && isUpdate]);

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupStartDate, setShowPopupStartDate] = useState(false);
  const [showPopupEndDate, setShowPopupEndDate] = useState(false);

  const togglePopup = (setter) => {
    setter((prev) => !prev);
  };

  return (
    <div className={style.container}>
      <button onClick={() => togglePopup(setShowPopup)}>
        <IoCalendarOutline />
        <IoArrowDown />
      </button>
      {isRangeLook ? (
        <>
          <div
            className={`${style.dateContainer} ${
              isStartDateGreaterThanEndDate ? style.error : style.success
            }`}
            onClick={() => togglePopup(setShowPopupStartDate)}
          >
            <span className={style.title}>Начальная дата:</span>
            {selectedStart?.date && (
              <span className={style.date}>
                {`${selectedStart.date}`}/{`${selectedStart.time}`}
              </span>
            )}
          </div>
          <div className={style.arrow}>
            <LuArrowBigRightDash color="purple" />
          </div>
          <div
            className={`${style.dateContainer} ${
              isStartDateGreaterThanEndDate ? style.error : style.success
            }`}
            onClick={() => togglePopup(setShowPopupEndDate)}
          >
            <span className={style.title}>Конечная дата:</span>
            {selectedEnd?.date && (
              <span className={style.date}>
                {`${selectedEnd.date}`}/{`${selectedEnd.time}`}
              </span>
            )}
          </div>
        </>
      ) : (
        <div className={style.rangeContainer}>
          <p>{choosenRange[0]}</p>
          <button onClick={() => setIsRangeLook((prev) => !prev)}>
            Показать временной промежуток
          </button>
        </div>
      )}

      {showPopup && (
        <Popup toggle={setShowPopup}>
          <MainPopup />
        </Popup>
      )}

      {showPopupStartDate && (
        <Popup toggle={setShowPopupStartDate}>
          <AddPopup startingPoint="start" />
        </Popup>
      )}

      {showPopupEndDate && (
        <Popup toggle={setShowPopupEndDate}>
          <AddPopup startingPoint="end" />
        </Popup>
      )}
    </div>
  );
};
