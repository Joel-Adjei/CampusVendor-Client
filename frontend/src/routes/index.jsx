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
import Notes from "@/components/vendor/Notes";
import VendorOrders from "@/pages/vendor/VendorOrders";
import VendorChat from "@/pages/vendor/VendorChat";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import Search from "@/pages/user/Search";
import Products from "@/pages/user/Products";
import ProductDetails from "@/pages/user/ProductDetails";
import Cart from "@/pages/user/Cart";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>

        <Route path="vendor" element={<VendorLayout />}>
          <Route index element={<VendorHome />} />
          <Route path="products" element={<VendorProduct />} />
          <Route path="chat" element={<VendorChat />} />
          <Route path="orders" element={<VendorOrders />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="vendors" element={<AdminVendors />} />
        </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route index path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="note/vendor" element={<Notes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
