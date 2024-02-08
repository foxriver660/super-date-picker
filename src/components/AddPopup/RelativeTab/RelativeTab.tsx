/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, FC } from "react";
import { NumberInput } from "../../../UI/NumberInput/NumberInput";
import Select from "../../../UI/Select/Select";
import { DateContainer } from "../../../UI/DateContainer/DateContainer";
import { formatDate } from "../../../utils/helpers";
import { Divider } from "../../../UI/Divider/Divider";
import { useDateContext } from "../../../context/context";

interface IRelativeProps {
  startingPoint: "start" | "end";
}
const selectorOptionsGradation = [
  { value: "minutes", label: "минут" },
  { value: "hours", label: "часов" },
  { value: "days", label: "дней" },
  { value: "weeks", label: "недель" },
  { value: "months", label: "месяцев" },
  { value: "years", label: "лет" },
];
const selectorOptionsDirection = [
  { value: true, label: "прибавить" },
  { value: false, label: "отнять" },
];

export const RelativeTab: FC<IRelativeProps> = ({ startingPoint }) => {
  const { setIsUpdate, setChoosenFormatedDate, choosenFormatedDate } =
    useDateContext();
  const dateToUse =
    startingPoint === "start"
      ? choosenFormatedDate.startDate
      : choosenFormatedDate.endDate;

  const [values, setValues] = useState({
    number: 10,
    gradation: "minutes",
    direction: true,
  });
  const [updatedDate, setUpdatedDate] = useState(new Date());
  const [initialState] = useState(dateToUse);

  const handleNumberInputChange = (newValue) => {
    setValues((prevData) => ({ ...prevData, number: +newValue }));
  };
  const handleSelectorGradationChange = (selectedValue) => {
    setValues((prevData) => ({ ...prevData, gradation: selectedValue }));
  };
  const handleSelectorDirectionChange = (selectedValue) => {
    const value = selectedValue === "false" ? false : true;
    setValues((prevData) => ({ ...prevData, direction: value }));
  };

  useEffect(() => {
    const { number, gradation, direction } = values;
    if (initialState) {
      let newTime = new Date(initialState.getTime());

      switch (gradation) {
        case "minutes":
          newTime = new Date(
            direction
              ? newTime.getTime() + number * 60000
              : newTime.getTime() - number * 60000
          );
          break;
        case "hours":
          newTime = new Date(
            direction
              ? newTime.getTime() + number * 3600000
              : newTime.getTime() - number * 3600000
          );
          break;
        case "days":
          newTime = new Date(
            direction
              ? newTime.getTime() + number * 86400000
              : newTime.getTime() - number * 86400000
          );
          break;
        case "weeks":
          newTime = new Date(
            direction
              ? newTime.getTime() + number * 604800000
              : newTime.getTime() - number * 604800000
          );
          break;
        case "months":
          newTime.setMonth(
            direction
              ? newTime.getMonth() + number
              : newTime.getMonth() - number
          );
          break;
        case "years":
          newTime.setFullYear(
            direction
              ? newTime.getFullYear() + number
              : newTime.getFullYear() - number
          );
          break;
        default:
          break;
      }
      setChoosenFormatedDate(
        startingPoint === "start"
          ? { ...choosenFormatedDate, startDate: newTime }
          : { ...choosenFormatedDate, endDate: newTime }
      );
      setUpdatedDate(newTime);
      setIsUpdate((prev) => !prev);
    }
  }, [values]);

  return (
    <div>
      <NumberInput defaultValue={10} onChange={handleNumberInputChange} />
      <Select
        value={selectorOptionsGradation[0].value}
        options={selectorOptionsGradation}
        onChange={handleSelectorGradationChange}
      />
      <Select
        value={selectorOptionsDirection[0].label}
        options={selectorOptionsDirection}
        onChange={handleSelectorDirectionChange}
      />
      <Divider />
      <DateContainer
        startingPoint={startingPoint}
        date={formatDate(updatedDate, "DDD DD MMM YYYY")}
        time={`${updatedDate
          .getHours()
          .toString()
          .padStart(2, "0")}:${updatedDate
          .getMinutes()
          .toString()
          .padStart(2, "0")}`}
      />
    </div>
  );
};
