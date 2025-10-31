import { create } from "zustand";
import { persist , devtools } from "zustand/middleware";

const initalState = {
    role: "",
    name: "",
    email: "",
    password: "",
    otpToken: "",
};

export const useOtpStore = create(
    devtools(
        persist(
            (set) => ({
                ...initalState,
                setOtpDetails: (data) => set(() => ({
                    role: data.role,
                    name: data.name,
                    email: data.email,
                    otpToken: data.otpToken,
                    password: data.password,
                })),
                clearOtpDetails: () => set(() => ({
                    ...initalState,
                })),
            }),
            {
                name: "otp-storage", // unique name
                version: 1,
            }
        )
    )
);