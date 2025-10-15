import React, { useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const Sidebar = ({ children, width = "w-70", position = "right", isOpen , onOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function setPosition(){
    switch (position) {
      case "left":
        return `left-0 ${isOpen ? "transform translate-x-0" : "transform -translate-x-full"}`;
      case `right`:
        return `right-0 ${isOpen ? "transform -translate-x-0" : "transform translate-x-full"}`;
      default:
        return "right-0";
    }
  }


  return (
    <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
      onClick={() => onOpen(false)}
    >
        <div
            className={`absolute inset-0 w-full bg-black ${
            isOpen ? "opacity-50" : "opacity-0"
        }`}
        ></div>

        <div
            className={`fixed top-0 ${width} h-screen max-w-full bg-white shadow-2xl transition-transform duration-300 ease-in-out z-50 ${
               setPosition()
            }`}
            onClick={(e) => e.stopPropagation()}
        >

            <div className="h-[100vh] flex flex-col">
                {children}
            </div>
           
        </div>

    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  collapsible: PropTypes.bool,
};

Sidebar.defaultProps = {
  width: "w-64", // Tailwind width class
  collapsible: false,
};

const SidebarHeader = ({ children , onOpen , className , otherprops}) => (
    
    <div 
        className={`${className} relative p-2`}
        {...otherprops}
    >
    
        {children}
    
        <button
            onClick={() => onOpen(false)}
            className="absolute top-0 -left-10 p-2 text-gray-100 cursor-pointer hover:text-gray-900 focus:outline-none rounded-md hover:bg-gray-100"
        >
            <X className="h-6 w-6" />
        </button>
    </div>
);

SidebarHeader.propTypes = {
  children: PropTypes.node.isRequired,
    onOpen: PropTypes.func.isRequired,
    className: PropTypes.string,
    otherprops: PropTypes.object,
};

const SidebarContent = ({ children }) => (
  <div className="flex-grow p-4 overflow-y-auto">{children}</div>
);

SidebarContent.propTypes = {
  children: PropTypes.node.isRequired,
};

const SidebarFooter = ({ children }) => (
  <div className="p-4 border-t border-gray-700">{children}</div>
);

SidebarFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter };