import PanelNavbar from "@/components/vendor/PanelNavbar"
import React from "react"
import { Outlet, useNavigate } from "react-router-dom"

const VendorLayout =()=>{
    const navigate = useNavigate()

    return (
        <div className="min-h-[100vh] bg-white">
            <PanelNavbar />
            <div className="min-h-[calc(100vh-3.85rem)] bg-gray-50 md:pl-70">
                <Outlet />
            </div>
            
        </div>
    )
}

export default VendorLayout