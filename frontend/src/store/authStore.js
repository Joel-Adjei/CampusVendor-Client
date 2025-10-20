import { defaultAdmin } from "@/lib/data";
import { create } from "zustand";
import { persist , devtools } from "zustand/middleware";

const initialValue = {
    users: [],
    vendors: [],
    admins: [defaultAdmin],
    email :"",
    name: "",
    password: "",
    description: "",
    businessName: "",
    phoneNumber: "",
    location: "",
    isLogin : false,
    role: "",
    status:"",
}

export const useAuthStore = create(
    devtools(
        persist(
            (set)=>({
                ...initialValue,
                signUpUser: (data) => set((state)=>({ users: [...state.users, data]})),
                signUpVendor: (data) => set((state)=>({ vendors: [...state.vendors, data]})),
                updateLogin: (data) => set(() => ({ isLogin: true, email: data.email, password: data.password })),
                updateVendor: (data) => set(() => ({ 
                    role: data.role, 
                    name: data.name ,
                    email: data.email,
                    description: data.description,
                    phoneNumber: data.phoneNumber,
                    businessName: data.businessName,
                    location: data.location,
                    status: data.status,
                })),    
                updateLogout: () => set((state) => ({ isLogin: false, ...initialValue , users: state.users , vendors: state.vendors , admins: state.admins})),
                updateName: (data) => set(() => ({ name: data.name })),
                updateDescrip: (data) => set(() => ({ name: data.description })),
                updateRole: (data) => set(() => ({ role: data })),
            }),
            {
                name: "auth-storage", // unique name
                version: 1,
            }
            
        )
    )
)