import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";

const CusSelect = ({
  selectValue = "Select an option",
  value,
  optionsLabel,
  onChange,
  options,
}) => {
  return (
    <div>
      <Select
        value={value}
        onValueChange={(selectedValue) => {
          const selected = options.find((opt) => opt.value === selectedValue);
          onChange(selected); 
        }}
      >
        <SelectTrigger className={"h-[100px] w-full rounded-sm"}>
          <SelectValue placeholder={selectValue} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{optionsLabel}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CusSelect;
