import { create } from "zustand";
import { persist , devtools } from "zustand/middleware";

const initialValue = {
    users: [],
    vendors: [],
    email :"",
    password: "",
    isLogin : false,
    role: "",
    userName: "",
    description: "",
}

export const useAuthStore = create(
    devtools(
        persist(
            (set)=>({
                ...initialValue,
                signUpUser: (data) => set((state)=>({ users: [...state.users, data]})),
                signUpVendor: (data) => set((state)=>({ vendors: [...state.vendors, data]})),
                updateLogin: (data) => set(() => ({ isLogin: true, email: data.email, password: data.password })),
                updateLogout: () => set(() => ({ isLogin: false, email: "", password: "", role: "", name: "" })),
                updateName: (data) => set(() => ({ name: data.userName })),
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