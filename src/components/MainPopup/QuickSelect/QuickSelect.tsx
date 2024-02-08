import { useState } from "react";
import { NumberInput } from "../../../UI/NumberInput/NumberInput";
import Select from "../../../UI/Select/Select";
import { formatForQuickSelect } from "../../../utils/helpers/formatForQuickSelect";
import { useDateContext } from "../../../context/context";
import {
  gradationRus,
  selectedOrderRus,
} from "../../../utils/helpers/convertValueToRus";
import style from "./QuickSelect.module.css";

const selectorOptionsOrder = [
  { value: "previous", label: "Предыдущие" },
  { value: "next", label: "Следующие" },
];
const selectorOptionsGradation = [
  { value: "minutes", label: "минут" },
  { value: "hours", label: "часов" },
  { value: "days", label: "дней" },
  { value: "months", label: "месяцев" },
  { value: "years", label: "лет" },
];

export const QuickSelect = () => {
  const [date, setDate] = useState({
    selectedOrder: "previous",
    number: 10,
    gradation: "minutes",
  });
  const { addUniqueRange, setChoosenFormatedDate } = useDateContext();

  const handleNumberInputChange = (newValue) => {
    setDate((prevData) => ({ ...prevData, number: +newValue }));
  };
  const handleSelectChange = (field, value) => {
    setDate((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatedDate = formatForQuickSelect(date);
    setChoosenFormatedDate(formatedDate);
    addUniqueRange(
      `${selectedOrderRus[date.selectedOrder]} ${date.number} ${
        gradationRus[date.gradation]
      }`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={style.title}>Быстрый выбор</h2>
      <div className={style.inputContainer}>
        <Select
          value={selectorOptionsOrder[0].label}
          options={selectorOptionsOrder}
          onChange={(value) => handleSelectChange("selectedOrder", value)}
        />
        <NumberInput defaultValue={10} onChange={handleNumberInputChange} />
        <Select
          value={selectorOptionsGradation[0].label}
          options={selectorOptionsGradation}
          onChange={(value) => handleSelectChange("gradation", value)}
        />
        <button type="submit">Установить</button>
      </div>
    </form>
  );
};
