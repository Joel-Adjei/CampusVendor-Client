import React, { useEffect } from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import Button from "@/components/ui/Button"
import { AArrowUp } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Home =()=>{
    const navigate = useNavigate()
    const updateLogout = useAuthStore((state)=> state.updateLogout)
    const isLogin = useAuthStore((state)=> state.isLogin)

    const handleLogout =()=>{
        updateLogout()
        toast.success("Logged out successfully")
    }
    return(
        <div>
            <BlurFade>
                <p className="text-4xl">Home Page</p> 
            </BlurFade>

            <Button
                className={""}
                variant="primary"
                Icon={AArrowUp}
                iconType="icon-left"
                onClick={isLogin ? handleLogout : ()=> navigate("/auth/login")}
            >
                {isLogin ? "Logout" : "Login"}
            </Button>

            <Button Icon={AArrowUp}  iconType="icon-only" variant="outline" />
                
        </div>
    )
}

export default Home