import { useState } from "react";

const Select = ({ value, onChange, options }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <select
      className="select"
      value={selectedValue}
      onChange={handleSelectChange}
    >
      {options.map((option) => (
        <option className="option" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
export default Select;
