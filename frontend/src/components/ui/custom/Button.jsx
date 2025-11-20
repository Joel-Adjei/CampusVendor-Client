import { Loader2, LoaderIcon } from "lucide-react";
import React from "react";

const Button = ({
  children,
  iconSize,
  iconStyle,
  onClick,
  disabled = false,
  type,
  isLoading = false,
  variant = "primary",
  iconType = "icon-left",
  Icon,
  className,
}) => {
  function getColors() {
    switch (variant) {
      case "primary" || "":
        return "bg-gradient-to-br from-blue-900 to-blue-400 text-white cursor-pointer";

      case "secondary":
        return "bg-gradient-to-br from-blue-100 to-yellow-100 text-blue-950 shadow-lg cursor-pointer";

      case "outline":
        return "bg-none border-1 border-blue-700 text-blue-700 cursor-pointer";

      default:
        return "bg-gray-400 text-gray-300 cursor-not-allowed";
    }
  }

  return (
    <>
      {!(iconType == "icon-only") ? (
        <button
          type={type}
          disabled={disabled || isLoading}
          onClick={onClick}
          className={`${className} w-fit flex justify-center text-xs md:text-sm font-medium items-center gap-2 px-4.5 py-1 md:px-9 md:py-2 rounded-full 
                        disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-300
                        ${getColors()}`}
        >
          {isLoading && iconType === "icon-left" ? (
            <Loader2 size={iconSize} className={`${iconStyle} animate-spin`} />
          ) : (
            iconType === "icon-left" && Icon && <Icon size={iconSize} />
          )}

          {children}

          {isLoading && iconType === "icon-right" ? (
            <Loader2 size={iconSize} className={`${iconStyle} animate-spin`} />
          ) : (
            iconType === "icon-right" && Icon && <Icon size={iconSize} />
          )}
        </button>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`${className} size-12 cursor-pointer flex justify-center items-center  rounded-full  ${getColors()}`}
        >
          {Icon && <Icon size={iconSize} className={iconStyle} />}
        </button>
      )}
    </>
  );
};

export default Button;
