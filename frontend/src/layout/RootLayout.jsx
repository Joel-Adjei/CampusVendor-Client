import { Outlet } from "react-router-dom"

const RootLayout =()=>{
    return (
        <div className="min-h-[100vh] bg-white">
            <Outlet />
        </div>
    )
}

export default RootLayout