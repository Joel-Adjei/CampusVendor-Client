import { useAuthStore } from '@/store/authStore';
import React from 'react';
import { SidebarHeader } from '../ui/Siderbar';
import Button from '../ui/Button';
import { LogOut, User } from 'lucide-react';

const VendorProfilePanel =({onOpen , onLogout})=>{
    const name = useAuthStore(state => state.userName)
    const email = useAuthStore(state => state.email)
    return(
        <div>
            <SidebarHeader onOpen={onOpen}>
                <div className="flex h-full flex-col items-center gap-2">
                    <User size={120} className="text-gray-400"/>
                <div>
                    <h1 className="font-medium text-gray-700">{name}</h1>
                    <p className="font-medium text-gray-700">{email}</p>
                </div>
                </div>
            </SidebarHeader>
        
            <div className="flex flex-1 flex-col gap-1">
                <div className="flex-1 ">
        
                </div>

                <div className="px-4 py-3">
                    <Button variant="outline" Icon={LogOut} className={"w-full"} onClick={onLogout}>Logout</Button>
                </div>
            </div>
        </div>
    )
}

export default VendorProfilePanel;