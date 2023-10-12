import { atom } from "recoil"
import { LoginInputs, RegistrationInputs } from "../@types/auth"




export const registrationAtom = atom<RegistrationInputs>({
    key: "USER_REGISTRATION",
    default: {
        email: "",
        birthday: "",
        password: "",
        passwordConfirm: "",
        account_type: 'guest',
        phone: "",
        first_name: "",
        last_name: "",
        name: "",
        preferred_currency: 'NGN'
    }
})




