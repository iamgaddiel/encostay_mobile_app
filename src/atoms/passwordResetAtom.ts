import { atom } from "recoil";


export const forgetPasswordAtom = atom<"none" | "success" | "failed">({
    key: "FORGET_PASSWORD",
    default: "none"
})

export const passwordResetSwipeAtom = atom<any | null>({
    key: "PASSWORD_RESET_SWIPE",
    default: null
})

export const slidesAtom = atom<string[]>({
    key: "SLIDES",
    default: [
        "forget password",
        "otp",
        "reset",
    ]
})