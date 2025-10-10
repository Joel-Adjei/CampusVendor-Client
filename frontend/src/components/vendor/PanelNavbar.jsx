import { useAuthStore } from "@/store/authStore";
import { Bell, Home, Info, LogOut, Menu, MessageCircleIcon, Phone, Settings, ShoppingBag, ShoppingBasket, ShoppingCart, User, X } from "lucide-react";
import React, { useState } from "react";
import { href, NavLink, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import { Sidebar, SidebarHeader } from "../ui/Siderbar";

const navItems = [
    { name: "Dashboard", href: "#home" , icon: Home},
    { name: "Orders", href: "#how-it-works", icon: ShoppingBag },
    { name: "Charts", href: "#why-us", icon: MessageCircleIcon },
    { name: "Items", href: "#" , icon: ShoppingBasket}
  ];


const PanelNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifiOpen, setNotifiOpen] = useState(false);
  const [currentTab , setCurrentTab] = useState(navItems[0])

  const navigate = useNavigate()
  const isLogin = useAuthStore((state) => state.isLogin);
  const updateLogout = useAuthStore((state) => state.updateLogout);



  const handleLogout =()=>{
    setProfileOpen(false)
    updateLogout()
    toast.success("Logged out successfully")
    setIsOpen(false)
    navigate("/", { replace: true });
  }

  const primaryBlue = "rgb(37, 99, 235)"; // Tailwind blue-600 equivalent

  return (
    <>
    <nav className="bg-white shadow-lg md:pl-70 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-15">
          
          <div className="flex items-center flex-row-reverse gap-2 flex-shrink-0">
            <h2 className="flex gap-3 items-center text-xl text-blue-600 font-bold">
                <currentTab.icon className="text-yellow-400" />
                {currentTab.name}
            </h2>

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



          <div className="flex items-center">
          {isLogin && (
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
                    Icon={User}
                    onClick={()=> setProfileOpen(!profileOpen)}
                    className={"h-9 w-9"}
                />
            </>
            ) }
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
            <SidebarHeader onOpen={setProfileOpen}>
                <div className="flex flex-col items-center gap-2">
                    <User size={120} className="text-gray-400"/>
                <div>
                    <h1 className="font-medium text-gray-700">Lydia Osei</h1>
                </div>
                </div>
            </SidebarHeader>

            <div className="flex flex-1 flex-col gap-1">
                <div className="flex-1 ">

                </div>
                
                <div className="px-4 py-3">
                    <Button variant="outline" Icon={LogOut} className={"w-full"} onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </Sidebar>

      {/* --- Mobile Off-Canvas Menu Content --- */}
      <MobileNavbar  isOpen={isOpen} setIsOpen={setIsOpen} onLogout={handleLogout} isLogin={isLogin} items={navItems}/>

    </nav>

    <aside 
        className="hidden md:block bg-white w-70 h-screen fixed left-0 top-0 z-50"
    >
       <div className=" bg-gray-200 h-15">
        vbcbc
       </div>

       <div className="mt-4 flex h-[calc(100vh-4.85rem)] flex-col">
            <div className=" pl-3 flex flex-1 flex-col">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={()=> setCurrentTab(item)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium 
                        ${currentTab.name == item.name ? 
                            " bg-blue-600 text-gray-100 rounded-l-full" 
                            : "bg-white text-gray-600 hover:text-blue-600 "}
                            transition duration-150  ease-in-out `}
                >
                  <item.icon size={17} />
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="p-4">
                <Button variant="outline" Icon={LogOut} className={"border-none pl-3"} onClick={handleLogout}>Logout</Button>
            </div>
       </div>
    </aside>
    </>
  );
};

export default PanelNavbar;


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

    <div
      className={`fixed flex flex-col top-0 left-0 w-64 max-w-full h-screen bg-white shadow-2xl transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "transform translate-x-0" : "transform -translate-x-full" // Controls the left-to-right slide
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Menu Header with Logo and Close Button */}
      <div className="p-2 flex justify-end items-center bg-gradient-to-bl from-blue-600 to-blue-800 border-b border-gray-100">
        <NavLink to="/" className="flex items-center space-x-2 mr-auto">
          <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-white font-bold text-sm">
            C
          </div>
          <span className="text-md font-extrabold font-Montserrat text-gray-200 tracking-tight">
            Campus<span >Vendor</span>
          </span>
        </NavLink>
        
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 cursor-pointer text-gray-100 hover:text-gray-900 focus:outline-none rounded-md hover:bg-gray-100"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="p-4 flex-1 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition duration-150 ease-in-out"
          >
            <item.icon size={19}/>
            {item.name}
          </NavLink>
        ))}
      </div>

        <div className="py-2">
            <Button variant="outline" Icon={LogOut} className={"border-none pl-3"} onClick={onLogout}>Logout</Button>
        </div>

    </div>
  </div>
  );
};
