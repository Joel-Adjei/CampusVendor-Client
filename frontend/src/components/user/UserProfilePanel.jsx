import React from "react";
import { useAuthStore } from "@/store/authStore";
import { User, Mail, LogOut, Sidebar } from "lucide-react";
import Button from "@/components/ui/custom/Button";
import { toast } from "react-toastify";
import { SidebarHeader } from "../ui/Siderbar";

const UserProfilePanel = ({ onClose }) => {
  const { email, user, updateLogout } = useAuthStore();

  const handleLogout = () => {
    updateLogout();
    toast.success("Logged out successfully!");
    if (onClose) onClose();
  };

  return (
    <div className="h-full bg-white flex flex-col font-inter">
      {/* Profile Header */}
      <SidebarHeader 
      className={"p-0"}
      onOpen={onClose}
      >
        <div className="h-65 bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white rounded-md" >
          <div className="flex flex-col items-center gap-4">
            <div className="w-30 h-30 bg-white/20 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
            <div>
              <h3 className="font-semibold text-center text-lg">
                {user?.name || "User Name"}
              </h3>
              <p className="text-blue-100 text-center flex items-center gap-2">
                <Mail size={16} />
                {email || "user@ug.edu.gh"}
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* Profile Content */}
      <div className="flex-1 p-6">
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4"></div>

          <div className="bg-gray-50 rounded-xl p-4"></div>
        </div>
      </div>

      {/* Logout Button at Bottom */}
      <div className="p-6 border-t bg-gray-50">
        <Button
          variant="outline"
          Icon={LogOut}
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfilePanel;
