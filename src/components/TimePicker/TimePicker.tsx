/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import "./TimePicker.css";
import { formatTimeForAbsolute } from "../../utils/helpers/formatTimeForAbsolute";

interface ITimePicker {
  onTimeSelected: (arg) => void;
}

export const TimePicker: FC<ITimePicker> = ({ onTimeSelected }) => {
  const [selectedTime, setSelectedTime] = useState({
    hour: "",
    minute: "",
    period: "",
  });

  const handleTimeChange = (type, value) => {
    setSelectedTime((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const isAnyFieldEmpty = Object.values(selectedTime).some(
    (value) => value === ""
  );
  const isAllFieldEmpty = !Object.values(selectedTime).every(
    (value) => value === ""
  );

  useEffect(() => {
    if (!isAnyFieldEmpty) {
      const formatedTime = formatTimeForAbsolute(selectedTime);
      onTimeSelected(formatedTime);
    }
  }, [selectedTime]);

  return (
    <div className="container">
      <div className="content">
        <select
          value={selectedTime.hour}
          onChange={(e) => handleTimeChange("hour", e.target.value)}
          className={selectedTime.hour === "" ? "red-border" : ""}
        >
          <option value="">Часов</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={(i + 1).toString()}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          value={selectedTime.minute}
          onChange={(e) => handleTimeChange("minute", e.target.value)}
          className={selectedTime.minute === "" ? "red-border" : ""}
        >
          <option value="">Минут</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i * 5} value={(i * 5).toString()}>
              {i * 5 < 10 ? `0${i * 5}` : i * 5}
            </option>
          ))}
        </select>
        <select
          value={selectedTime.period}
          onChange={(e) => handleTimeChange("period", e.target.value)}
          className={selectedTime.period === "" ? "red-border" : ""}
        >
          <option value="">Период</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      {isAnyFieldEmpty && isAllFieldEmpty && (
        <p className="error-message">Выберите значение во всех полях</p>
      )}
    </div>
  );
};
