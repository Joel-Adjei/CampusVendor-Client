import PanelNavbar from "@/components/vendor/PanelNavbar"
import ProfileSetup from "@/components/vendor/ProfileSetup"
import React, { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const VendorLayout =()=>{
    const navigate = useNavigate()
    const [isSetup , setIsSetup] = useState(true)

    return (
        <div className="min-h-[100vh] bg-white">
            {/* {isSetup && <ProfileSetup onSetup={setIsSetup} />} */}
            <PanelNavbar />
            <div className="min-h-[calc(100vh-3.85rem)] bg-gray-50 md:pl-65">
                <Outlet />
            </div>
            
        </div>
    )
}

export default VendorLayout