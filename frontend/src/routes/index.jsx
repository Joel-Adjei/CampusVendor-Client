import AuthLayout from "@/layout/AuthLayout";
import RootLayout from "@/layout/RootLayout";
import VendorLayout from "@/layout/VendorLayout";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Home from "@/pages/Home";
import VendorProduct from "@/pages/vendor/VendorProduct";
import VendorHome from "@/pages/vendor/VendorHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLayout from "@/layout/AdminLayout";
import AdminVendors from "@/pages/admin/AdminVendors";


const Router = ()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<Home />} />
                </Route>

                <Route path="vendor" element={<VendorLayout />}>
                    <Route index element={<VendorHome />} />
                    <Route path="products" element={<VendorProduct />} />
                </Route>

                <Route path="admin" element={<AdminLayout />}>
                   <Route index element={<AdminDashboard />} />
                   <Route path="vendors" element={<AdminVendors />} />
                </Route>
                
                <Route path="auth" element={<AuthLayout />}>
                        <Route index path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router