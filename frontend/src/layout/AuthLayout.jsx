import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const AuthLayout =()=>{
    const navigate = useNavigate()

    return (
        <div className="min-h-[100vh] bg-white">
            <Outlet />
        </div>
    )
}

export default AuthLayout