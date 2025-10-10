import Navbar from "@/components/navbar/Navbar"
import { Outlet } from "react-router-dom"

const RootLayout =()=>{
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