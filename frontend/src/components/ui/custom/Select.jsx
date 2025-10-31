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

const CusSelect = ({selectValue = "Select an option" , optionsLabel , options}) => {
  return (
    <div>
      <Select>
        <SelectTrigger
            className={"h-[90px] min-w-[150px] rounded-sm"}
        >
            <SelectValue placeholder={selectValue} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{optionsLabel}</SelectLabel>
            {
                options.map((option)=> (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CusSelect;
