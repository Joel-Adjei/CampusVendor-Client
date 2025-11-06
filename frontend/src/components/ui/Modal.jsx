import React, { useEffect } from "react";

const Modal =({ display , children})=>{
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

    if(!display) return null;

    return(
        <section className="fixed flex justify-center items-center top-0 left-0 z-50 w-full h-[100vh] bg-black/50 backdrop-blur-xs p-4">
            <div className="custom-scrollbar bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto ">
                {children}
            </div>
        </section>
    )
}

export default Modal;