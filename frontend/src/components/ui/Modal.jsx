import React from "react";

const Modal =({ display , children})=>{
    if(!display) return null;

    return(
        <section className="fixed flex justify-center items-center top-0 z-50 w-full h-[100vh] bg-black/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] ">
                {children}
            </div>
        </section>
    )
}

export default Modal;