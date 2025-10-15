import React from "react";

const Modal =()=>{
    return(
        <section className="fixed flex justify-center items-center top-0 z-70 w-full h-[100vh] bg-black/30 backdrop-blur-xs">
            <div className="min-w-2xl rounded-2xl h-100 bg-white">
                <h2 className="w-full text-center font-semibold bg-gray-200">SetUp</h2>
            </div>
        </section>
    )
}

export default Modal;