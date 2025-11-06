import React from "react";

const StatCard = ({ Icon, value, label, color }) => {
  const getcolorClass = () => {
    switch (color) {
      case "yellow":
        return {
          text: "text-yellow-900",
          icon: "text-yellow-600",
          iconBg: "bg-yellow-100",
          border: "border-yellow-500",
        };

      case "red":
        return {
          text: "text-red-900",
          icon: "text-red-600",
          iconBg: "bg-red-100",
          border: "border-red-500",
        };

      case "green":
        return {
          text: "text-green-900",
          icon: "text-green-600",
          iconBg: "bg-green-100",
          border: "border-green-500",
        };

      default:
        return {
          text: "text-blue-900",
          icon: "text-blue-600",
          iconBg: "bg-blue-100",
          border: "border-blue-500",
        };
    }
  };

  return (
    <div>
      <div
        className={`bg-white  p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4  ${
          getcolorClass().border
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">{label}</p>
            <p className={`text-2xl font-bold ${getcolorClass().text} mt-1`}>
              {value}
            </p>
          </div>
          <div className={`p-3 ${getcolorClass().iconBg} rounded-full`}>
            <Icon className={`w-6 h-6 ${getcolorClass().icon}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
