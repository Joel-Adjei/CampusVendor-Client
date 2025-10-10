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
        <div>
            <BlurFade>
                <p className="text-4xl">Vendor Home Page</p> 
            </BlurFade>
                
        </div>
    )
}

export default VendorHome