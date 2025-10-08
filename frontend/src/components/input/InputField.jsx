import React from "react";

// Custom Input Field Component
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  isRequired = false,
  formik,
  Icon = null,
}) => (
  <div className="">
    <label htmlFor={name} className="flex pl-3 text-blue-700 gap-2 text-sm font-medium">
      <span>{Icon && <Icon size={20} className={"text-[#ffcb05]"} />}</span>{label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      placeholder={placeholder}
      className={`mt-1 block w-full px-6 py-2.5 rounded-full bg-gray-200/30 text-blue-900 outline-none focus:shadow-sm focus:border focus:ring-[#ffcb05] focus:border-[#ffcb05] transition duration-150 ${
        formik.touched[name] && formik.errors[name]
          ? "border-red-500"
          : "border-gray-300"
      }`}
      disabled={formik.isSubmitting}
    />
    {formik.touched[name] && formik.errors[name] && (
      <div className="text-red-500 text-xs ml-3 mt-1">{formik.errors[name]}</div>
    )}
  </div>
);

export default InputField;
