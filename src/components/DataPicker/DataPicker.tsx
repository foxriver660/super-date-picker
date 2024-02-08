/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, FC } from "react";
import style from "./DataPicker.module.css";
import { LuArrowBigRightDash } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { IoArrowDown } from "react-icons/io5";
import { MainPopup } from "../MainPopup/MainPopup";
import { AddPopup } from "../AddPopup/AddPopup";
import { useDateContext } from "../../context";
import { formatTime, formatDate, reverseParseDate } from "../../utils/helpers";
import {Popup} from "../../UI";


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
  const { isUpdate, choosenRange, addUniqueRange, choosenFormatedDate } =
    useDateContext();
  const formatDateStart = formatDate(
    choosenFormatedDate.startDate as Date,
    "DDD DD MMM YYYY"
  );
  const formatTimeStart = formatTime(choosenFormatedDate.startDate) as string;
  const formatDateEnd = formatDate(
    choosenFormatedDate.endDate as Date,
    "DDD DD MMM YYYY"
  );
  const formatTimeEnd = formatTime(choosenFormatedDate.endDate) as string;

  const [selectedStart, setSelectedStart] = React.useState<SelectedDateTime>({
    date: null,
    time: null,
  });
  const [selectedEnd, setSelectedEnd] = React.useState<SelectedDateTime>({
    date: null,
    time: null,
  });

  useEffect(() => {
    setSelectedStart({
      date: formatDateStart,
      time: formatTimeStart,
    });
    setSelectedEnd({
      date: formatDateEnd,
      time: formatTimeEnd,
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
      addUniqueRange(
        `${formatDateStart}/${formatTimeStart}→${formatDateEnd}/${formatTimeEnd}`
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
