/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, FC } from "react";
import { DateContainer } from "../../../UI/DateContainer/DateContainer";
import { TimePicker } from "../../TimePicker/TimePicker";
import { Calendar } from "../../Calendar/Calendar";
import { formatDate } from "../../../utils/helpers";
import { Divider } from "../../../UI/Divider/Divider";
import { useDateContext } from "../../../context/context";
import { formatTime } from "../../../utils/helpers/formatTime";

interface IAbsolute {
  startingPoint: "start" | "end";
  setSelectTime: (arg: string) => void;
  setSelectedDay: (arg: Date) => void;
}

export const AbsoluteTab: FC<IAbsolute> = ({
  startingPoint,
  setSelectTime,
  setSelectedDay,
}) => {
  const { choosenFormatedDate } = useDateContext();
  const dateToUse =
    startingPoint === "start"
      ? choosenFormatedDate.startDate
      : choosenFormatedDate.endDate;

  const [initialState] = useState(dateToUse);
  const [timeFromPicker, setTimeFromPicker] = useState();

  useEffect(() => {
    if (timeFromPicker) {
      setSelectTime(timeFromPicker);
    }
  }, [timeFromPicker]);

  return (
    <div>
      <Calendar
        selectedDate={initialState as Date}
        selectDate={(date) => {
          setSelectedDay(date);
        }}
      />
      <Divider />
      <TimePicker onTimeSelected={(data) => setTimeFromPicker(data)} />
      <Divider />
      <DateContainer
        startingPoint={startingPoint}
        date={formatDate(dateToUse as Date, "DDD DD MMM YYYY")}
        time={
          timeFromPicker
            ? timeFromPicker
            : (formatTime(choosenFormatedDate.startDate) as string)
        }
      />
    </div>
  );
};
