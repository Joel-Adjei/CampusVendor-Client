import React, { useEffect } from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import Button from "@/components/ui/Button"
import { AArrowUp } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const VendorHome =()=>{
    const navigate = useNavigate()
    const updateLogout = useAuthStore((state)=> state.updateLogout)
    const isLogin = useAuthStore((state)=> state.isLogin)

    return(
        <div className="p-8">
            <BlurFade direction="bottom" blur="0">
                <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-full h-80 grid grid-cols-1 sm:grid-cols-4 gap-3 rounded-2xl p-3 ">
                    <div className=" sm:col-span-3 h-full bg-blue-400/50 backdrop-blur-2xl border border-gray-100/50 rounded-2xl">

                    </div>
                    <div className="h-full grid grid-cols-2 sm:grid-cols-1 sm:grid-row-2 gap-3 rounded-2xl">
                        <div className="h-full bg-gray-50 rounded-2xl">

                        </div>
                        <div className="h-full bg-gray-50 rounded-2xl">

                        </div>

                    </div>
                </div> 
            </BlurFade>
                
        </div>
    )
}

export default VendorHome