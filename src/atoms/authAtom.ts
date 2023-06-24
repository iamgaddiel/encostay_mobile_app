import { atom } from "recoil"
import { LoginInputs, RegistrationInputs } from "../@types/auth"




export const registrationAtom = atom<RegistrationInputs>({
    key: "USER_REGISTRATION",
    default: {
        email: "",
        birthday: "",
        password: "",
        passwordConfirm: "",
        account_type: "",
        phone: "",
        first_name: "",
        last_name: "",
        name: "",
    }
})

// export const loginAtom = atom<LoginInputs>({
//     key: "USER_REGISTRATION",
//     default: {
//         email: "",
//         password: "",
//     }
// })



