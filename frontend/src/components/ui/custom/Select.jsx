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
import { Filter } from "lucide-react";

const CusSelect = ({
  selectValue = "Select an option",
  value,
  optionsLabel,
  onChange,
  options,
  Icon,
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
        <SelectTrigger className={"bg-white w-full rounded-sm border border-gray-300 focus:border focus:ring-[#ffcb05] focus:border-[#ffcb05]"}>
          {Icon && <Icon />}
          <SelectValue placeholder={selectValue} />
        </SelectTrigger>
        <SelectContent className={"border border-gray-300"}>
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
