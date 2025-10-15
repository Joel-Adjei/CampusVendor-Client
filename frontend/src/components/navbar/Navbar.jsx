import { useAuthStore } from "@/store/authStore";
import { Bell, Home, Info, LogOut, Menu, Phone, Settings, ShoppingBasket, ShoppingCart, User, X } from "lucide-react";
import React, { useState } from "react";
import { href, NavLink, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import { Sidebar, SidebarHeader } from "../ui/Siderbar";
import VendorProfilePanel from "../vendor/VendorProfilePanel";
import { images } from "@/assets/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifiOpen, setNotifiOpen] = useState(false);

  const navigate = useNavigate()
  const isLogin = useAuthStore((state) => state.isLogin);
  const updateLogout = useAuthStore((state) => state.updateLogout);
  const role = useAuthStore((state)=> state.role)

  const navItems = [
    { name: "Home", href: "#home" , icon: Home},
    { name: "About Us", href: "#how-it-works", icon: Info },
    { name: "Contacts", href: "#why-us", icon: Phone },
    { name: "Items", href: "#" , icon: ShoppingBasket}
  ];

  const handleNavigate = (type)=>{
    if(type === "login"){
        navigate("/auth/login")
    } else if(type === "signup") {
        navigate("/auth/signup")
    }
  }

  const handleLogout =()=>{
    setProfileOpen(false)
    updateLogout()
    toast.success("Logged out successfully")
    setIsOpen(false)
    navigate("/", { replace: true });
  }

  const primaryBlue = "rgb(37, 99, 235)"; // Tailwind blue-600 equivalent

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-15">
          {/* Logo/Brand Name */}
          <div className="flex font-Montserrat flex-row-reverse gap-2 flex-shrink-0">
            <a href="#" className="flex items-center space-x-2">
                
              <img src={images.logo} className="h-10 w-10 object-contain mr-3" />
              
              <span className="hidden md:block text-2xl text-blue-500 font-extrabold tracking-tight">
                Campus<span className="font-medium italic text-yellow-300"> Vendor</span>
              </span>
            </a>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)} // Opens the fixed panel
                type="button"
                className="inline-flex cursor-pointer items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition duration-150 ease-in-out"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Desktop Menu Items (Hidden on Mobile) */}
          <div className="hidden md:flex  items-center ">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out rounded-lg"
              >
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
                    onClick={()=> setNotifiOpen(!notifiOpen)}
                    className={"h-9 w-9 text-gray-400 hover:text-blue-500 mr-3 border-none"}
                />

                <Button 
                    variant="outline" 
                    iconType="icon-only"
                    Icon={ShoppingCart}
                    // onClick={()=> setNotifiOpen(!notifiOpen)}
                    className={"h-9 w-9 text-gray-400 hover:text-blue-500 mr-3 border-none"}
                />

                <Button 
                    variant="outline" 
                    iconType="icon-only"
                    Icon={User}
                    onClick={()=> setProfileOpen(!profileOpen)}
                    className={"h-9 w-9"}
                />
            </>
            ) : (
              <div className="flex items-center">
                <Button onClick={()=> handleNavigate("signup")}  variant="primary" className="hidden md:flex ml-4 h-fit">
                    Get Started
                </Button>
                <Button onClick={()=> handleNavigate("login")} variant="outline" className={"ml-1 h-fit"}>
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
                    <Bell size={20} className="text-gray-400"/>
                    <h1 className="font-medium text-gray-700">Notifications</h1>
                </div>
                
            </SidebarHeader>

        </Sidebar>

        <Sidebar isOpen={profileOpen} position="right" onOpen={setProfileOpen}>
            {role === "vendor" && <VendorProfilePanel />}
        </Sidebar>

      {/* --- Mobile Off-Canvas Menu Content --- */}
      {/* Overlay: fixed position, covers screen, fades in */}
      <MobileNavbar  isOpen={isOpen} setIsOpen={setIsOpen} onLogout={handleLogout} isLogin={isLogin} items={navItems}/>

    </nav>
  );
};

export default Navbar;


const MobileNavbar = ({setIsOpen , isOpen , items , isLogin , onLogout}) => {
    const navigate = useNavigate()

    const handleNavigate = (type)=>{
        if(type === "login"){
            setIsOpen(false)
            navigate("/auth/login")
        } else if(type === "signup") {
            setIsOpen(false)
            navigate("/auth/signup")
        }
      
    }

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
      className={`fixed top-0 left-0 w-64 max-w-full h-screen bg-white shadow-2xl transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "transform translate-x-0" : "transform -translate-x-full" // Controls the left-to-right slide
      }`}
      // Prevents menu from closing when clicking inside the panel
      onClick={(e) => e.stopPropagation()}
    >
      {/* Menu Header with Logo and Close Button */}
      <div className="p-2 flex justify-end items-center bg-gradient-to-bl from-blue-400 to-blue-800 border-b border-gray-100">
        <NavLink to="/" className="flex items-center space-x-2 mr-auto">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center p-1 text-white font-bold text-sm">
            <img src={images.logo} className="h-6 w-6 object-contain mr-1.5" />
          </div>
          <span className="text-md font-extrabold font-Montserrat text-gray-100 tracking-tight">
            Campus<span className="font-medium italic text-yellow-300" > Vendor</span>
          </span>
        </NavLink>
        {/* Close Button inside the panel */}
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 cursor-pointer text-gray-100 hover:text-gray-50 focus:outline-none rounded-md hover:bg-blue-100/30"
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
            className="flex items-center gap-2 p-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition duration-150 ease-in-out"
          >
            <item.icon size={19}/>
            {item.name}
          </NavLink>
        ))}

        
      </div>
    </div>
  </div>
  );
};
