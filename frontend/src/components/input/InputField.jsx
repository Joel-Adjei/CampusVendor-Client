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
  as="input"
}) => (
  <div className="">
    <label htmlFor={name} className="flex pl-3 text-blue-700 gap-1.5 text-sm mb-1 ">
      <span>{Icon && <Icon size={17} className={"text-[#ffcb05]"} />}</span>{label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    {as == "textarea" ?
    <textarea 
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      placeholder={placeholder}
      id={name}
      name={name}
      type={type}
      rows={4}
      className={` block w-full px-6 py-2.5 border rounded-xl bg-gray-200/30 text-blue-900 outline-none focus:shadow-sm focus:border focus:ring-[#ffcb05] focus:border-[#ffcb05] transition duration-150 ${
        formik.touched[name] && formik.errors[name]
          ? "border-red-500"
          : "border-gray-300"
      }`}
    />

    : <input
      id={name}
      name={name}
      type={type}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      placeholder={placeholder}
      className={` block w-full px-6 py-2 border rounded-full bg-gray-200/30 text-blue-900 outline-none focus:shadow-sm focus:border focus:ring-[#ffcb05] focus:border-[#ffcb05] transition duration-150 ${
        formik.touched[name] && formik.errors[name]
          ? "border-red-500"
          : "border-gray-300"
      }`}
      disabled={formik.isSubmitting}
    />}
    {formik.touched[name] && formik.errors[name] && (
      <div className="text-red-500 text-xs ml-3 mt-1">{formik.errors[name]}</div>
    )}
  </div>
);

export default InputField;
