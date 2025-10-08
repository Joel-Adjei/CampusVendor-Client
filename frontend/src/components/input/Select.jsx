import Select from "react-select";



function CustomSelect({ onChange, value, disabled, isRequired = false , label, options, Icon }) {

  const defaultValue = (
    options,
    value
  ) => {
    if (!options || !value) return null;
    return options.find((option) => option.value === value) || null;
  };

  return (
    <div>
    <label className="flex pl-3 text-blue-700 gap-2 text-sm font-medium mb-1">
      <span>{Icon && <Icon size={20} className={"text-[#ffcb05]"} />}</span>{label} {isRequired && <span className="text-red-500">*</span>}
    </label>
      <Select
        options={options || []}
        onChange={(option) => onChange(option)}
        value={defaultValue(options, value)}
        isClearable
        classNamePrefix="select"
        className="rounded-full"
        isDisabled ={ disabled}
      />
    </div>
  );
}

export default CustomSelect;
