import React from "react";

const Input = ({name , type , onChange , value, placeholder, className, ...props}) => {
  return (
    <div>
      <input
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={`${className} block w-full px-6 py-2.5 border rounded-full bg-gray-200/30 text-blue-900 outline-none focus:shadow-sm focus:border focus:ring-[#ffcb05] focus:border-[#ffcb05] transition duration-150`}
        {...props}
      />
    </div>
  );
};

export default Input;
