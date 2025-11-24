import { useAuthStore } from "@/store/authStore";
import {
  Bell,
  Home,
  Info,
  LogOut,
  Menu,
  Phone,
  Search,
  Settings,
  ShoppingBasket,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../ui/custom/Button";
import { toast } from "react-toastify";
import { Sidebar, SidebarHeader } from "../ui/Siderbar";
import VendorProfilePanel from "../vendor/VendorProfilePanel";
import { images } from "@/assets/assets";
import UserProfilePanel from "../user/UserProfilePanel";
import { FaStore } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifiOpen, setNotifiOpen] = useState(false);

  const navigate = useNavigate();
  const isLogin = useAuthStore((state) => state.isLogin);
  const updateLogout = useAuthStore((state) => state.updateLogout);
  const role = useAuthStore((state) => state.role);

  const navItems = [
    { name: "Products", href: "/products", icon: ShoppingBasket },
    { name: "Vendors", href: "/vendors", icon: FaStore },
    { name: "About Us", href: "#how-it-works", icon: Info },
  ];

  const handleNavigate = (type) => {
    if (type === "login") {
      navigate("/auth/login");
    } else if (type === "signup") {
      navigate("/auth/signup");
    }
  };

  const handleLogout = () => {
    setProfileOpen(false);
    updateLogout();
    toast.success("Logged out successfully");
    setIsOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-white w-full shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-15">
          {/* Logo/Brand Name */}
          <div className="flex font-Montserrat items-center flex-row-reverse gap-2 flex-shrink-0">
            <div className="lg:hidden bg-gray-300 rounded-full p-1">
              <Search
                className=" left-3 top-2.5 w-5 h-5 text-gray-100"
                onClick={() => navigate("/products")}
              />
            </div>

            <NavLink to="/" className="flex items-center space-x-2">
              <img src={images.logo} className="h-8 w-8 object-contain mr-3" />

              <span className="hidden md:block text-dxl text-blue-500 font-extrabold tracking-tight">
                Campus
                <span className="font-medium italic text-yellow-300">
                  {" "}
                  Vendor
                </span>
              </span>
            </NavLink>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="inline-flex cursor-pointer items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition duration-150 ease-in-out"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="hidden xl:block">
            <div className="relative flex items-center">
              <Search className="md:absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                className="hidden sm:block w-64 px-4 py-1.5 pl-9 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                onFocus={() => navigate("/products")}
              />
            </div>
          </div>

          {/* Desktop Menu Items  */}
          <div className="hidden md:flex  items-center font-Montserrat">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font- transition duration-150 ease-in-out rounded-lg"
              >
                <item.icon size={15} className="mb-1" />
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center">
            {isLogin ? (
              <>
                <Button
                  variant="outline"
                  iconType="icon-only"
                  Icon={Bell}
                  onClick={() => setNotifiOpen(!notifiOpen)}
                  className={
                    "h-9 w-9 text-gray-400 hover:text-blue-500 mr-3 border-none"
                  }
                />

                <Button
                  variant="outline"
                  iconType="icon-only"
                  Icon={ShoppingCart}
                  // onClick={()=> setNotifiOpen(!notifiOpen)}
                  className={
                    "h-9 w-9 text-gray-400 hover:text-blue-500 mr-3 border-none"
                  }
                />

                <Button
                  variant="outline"
                  iconType="icon-only"
                  Icon={User}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={"h-9 w-9"}
                />
              </>
            ) : (
              <div className="flex items-center">
                <Button
                  onClick={() => handleNavigate("signup")}
                  variant="primary"
                  className="hidden lg:flex ml-4 h-fit"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => handleNavigate("login")}
                  variant="outline"
                  className={"ml-1 h-fit"}
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Sidebar isOpen={notifiOpen} position="right" onOpen={setNotifiOpen}>
        <SidebarHeader onOpen={setNotifiOpen}>
          <div className="flex  items-center gap-2">
            <Bell size={20} className="text-gray-400" />
            <h1 className="font-medium text-gray-700">Notifications</h1>
          </div>
        </SidebarHeader>
      </Sidebar>

      <Sidebar isOpen={profileOpen} position="right" onOpen={setProfileOpen}>
        {role === "vendor" && <VendorProfilePanel />}
        {role.role === "customer" && (
          <UserProfilePanel onClose={setProfileOpen} />
        )}
      </Sidebar>

      {/* --- Mobile Off-Canvas Menu Content --- */}
      {/* Overlay: fixed position, covers screen, fades in */}
      <MobileNavbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onLogout={handleLogout}
        isLogin={isLogin}
        items={navItems}
      />
    </nav>
  );
};

export default Navbar;

const MobileNavbar = ({ setIsOpen, isOpen, items, isLogin, onLogout }) => {
  const navigate = useNavigate();

  const handleNavigate = (type) => {
    if (type === "login") {
      setIsOpen(false);
      navigate("/auth/login");
    } else if (type === "signup") {
      setIsOpen(false);
      navigate("/auth/signup");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
      onClick={() => setIsOpen(false)} // Close menu when clicking overlay
    >
      {/* Semi-transparent Backdrop (fades in) */}
      <div
        className={`absolute inset-0 bg-black ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
      ></div>

      {/* Sliding Menu Panel: fixed on left, slides in/out */}
      <div
        className={`fixed top-0 left-0 w-64 max-w-full h-screen bg-gray-50 shadow-2xl transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full" // Controls the left-to-right slide
        }`}
        // Prevents menu from closing when clicking inside the panel
        onClick={(e) => e.stopPropagation()}
      >
        {/* Menu Header with Logo and Close Button */}
        <div className="px-2 flex justify-end items-center border-b border-gray-200">
          <NavLink to="/" className="flex items-center space-x-2 mr-auto">
            <div className=" rounded-full flex items-center justify-center p-1 text-white font-bold text-sm">
              <img
                src={images.logo}
                className="h-6 w-6 object-contain mr-1.5"
              />
            </div>
            {/* <span className="text-md font-extrabold font-Montserrat text-gray-100 tracking-tight">
            Campus<span className="font-medium italic text-yellow-300" > Vendor</span>
          </span> */}
          </NavLink>
          {/* Close Button inside the panel */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 cursor-pointer text-gray-400 hover:text-gray-50 focus:outline-none rounded-md hover:bg-blue-100/30"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-4 px-1 space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 p-2 rounded-md text-base font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition duration-150 ease-in-out"
            >
              <item.icon size={19} />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
