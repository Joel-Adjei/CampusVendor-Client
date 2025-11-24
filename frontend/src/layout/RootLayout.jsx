import Navbar from "@/components/navbar/Navbar"
import { useAuthStore } from "@/store/authStore"
import { Outlet, useNavigate } from "react-router-dom"

const RootLayout =()=>{
    const role = useAuthStore(state => state.role);
    const navigate = useNavigate()

    if(role.role == "vendor"){
        navigate("/vendor")
        return null
    }
    
    return (
        <div className=" bg-white">
            <div>
                <Navbar />
            </div>
        <div className="pt-15 min-h-[calc(100vh-84px)]">
            <Outlet />
        </div>
        </div>
    )
}

export default RootLayout