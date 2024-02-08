import { FC, useState } from "react";

interface INumberInputProps {
  defaultValue: number;
  onChange: (arg) => void;
}

export const NumberInput: FC<INumberInputProps> = ({
  defaultValue,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <input
      type="number"
      step="1"
      min="0"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};
