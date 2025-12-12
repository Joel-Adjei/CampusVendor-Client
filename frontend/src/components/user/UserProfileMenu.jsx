import React from "react";
import { useAuthStore } from "@/store/authStore";
import { User, Mail, LogOut, Sidebar } from "lucide-react";
import Button from "@/components/ui/custom/Button";
import { toast } from "react-toastify";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const UserProfileMenu = () => {
  const { email, user, updateLogout } = useAuthStore();

  const handleLogout = () => {
    updateLogout();
    toast.success("Logged out successfully!");
    if (onClose) onClose();
  };

  return (
    <>
      <DropdownMenuItem className={"p-2"}>
        <div className=" text-white rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full flex items-center justify-center">
              <User size={22} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-600">
                {user?.name || "User Name"}
              </h3>
              <p className="text-gray-400 text-xs flex items-center gap-1">
                <Mail size={16} />
                {email || "user@ug.edu.gh"}
              </p>
            </div>
          </div>
        </div>
      </DropdownMenuItem>

      {/* Logout Button at Bottom */}
      <DropdownMenuItem className="hover:bg-transparent ">
        <Button
          variant="outline"
          Icon={LogOut}
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
          onClick={handleLogout}
          iconSize={13}
        >
          Logout
        </Button>
      </DropdownMenuItem>
    </>
  );
};

export default UserProfileMenu;
