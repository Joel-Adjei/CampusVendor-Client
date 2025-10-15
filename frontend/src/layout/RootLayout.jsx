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
        <div className="min-h-[100vh] bg-white">
            <div>
                <Navbar />
            </div>

            <Outlet />
        </div>
    )
}

export default RootLayout