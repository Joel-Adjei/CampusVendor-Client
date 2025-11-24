import { icons, objects } from "@/assets/assets";
import React from "react";

const Title = ({ title }) => {
  return (
    <div className="w-full flex flex-col items-center font-Montserrat">
      <div className="flex items-center">
        <div>
          <img src={icons.titleCart} className="h-6 w-6 object-contain" />
        </div>
        <h3 className="text-lg md:p-1.5 md:text-2xl font-bold bg-gradient-to-tr from-blue-700 to-blue-400 bg-clip-text text-transparent">
          {title}
        </h3>
      </div>

      <div className="ml-20">
        <img src={objects.line_01} className="w-17 md:w-30" />
      </div>
    </div>
  );
};

export default Title;
