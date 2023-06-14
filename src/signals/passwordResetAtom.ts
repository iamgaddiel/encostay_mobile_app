import { signal } from "@preact/signals-react"



// user signal to store curently logged in user
export const user = signal(null)
export const slides = signal<string[]>([
    "forget password",
    "otp",
    "reset",
])

export const forgetPasswordState = signal<"none" | "success" | "failed">("none")

// 