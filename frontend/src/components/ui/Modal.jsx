import { X } from "lucide-react";
import React, { useEffect } from "react";

const Modal = ({ display, children, Icon, title, subTitle ,onClose }) => {
  useEffect(() => {
    if (display) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up just in case
    return () => {
      document.body.style.overflow = "";
    };
  }, [display]);

  if (!display) return null;

  return (
    <section className="fixed flex justify-center items-center top-0 left-0 z-50 w-full h-[100vh] bg-black/50 backdrop-blur-xs p-4">
      <div className="custom-scrollbar bg-white rounded-2xl shadow-2xl max-w-4xl w-3xl ">
        <div>
          <div className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {Icon && <Icon className="w-6 h-6 text-white" />}
                <div>
                  <h2 className="text-xl font-bold">{title}</h2>
                  <p className="text-blue-100">
                    {subTitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onClose()}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>


        <div className="py-3 md:p-6 max-h-[80vh] overflow-y-auto">
          {children}
          </div>
      </div>
    </section>
  );
};

export default Modal;
