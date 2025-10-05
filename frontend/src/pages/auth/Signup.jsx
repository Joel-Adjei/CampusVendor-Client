import { BlurFade } from "@/components/ui/blur-fade"
import React from "react"

const Signup =()=>{
    return(
        <div className="min-h-[100vh] w-full flex flex-col md:flex-row  bg-gradient-to-br from-blue-700 to-blue-400">
            <section className="h-40 md:min-h-[100vh] w-full bg-gradient-to-br from-blue-700 to-blue-400 md:flex-1/2">
dfd
            </section>

            <section className=" bg-gray-100 flex-1 md:flex-1/2 h-full md:min-h-[100vh] rounded-t-2xl md:rounded-none">
                <BlurFade 
                    direction="top"
                    blur="0"
                    delay={0.6}
                    duration={1}
                >
                    <p className="text-4xl text-black">Signup Page</p>
                </BlurFade>
            </section>
        </div>
    )
}

export default Signup