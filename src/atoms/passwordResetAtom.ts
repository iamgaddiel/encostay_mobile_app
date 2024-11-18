import { atom } from "recoil";
import { UserCollectionType } from "../@types/users";



export interface PasswordResetFields {
    email: string
    // token: string
    // otp: string
}

export type PasswordResetEmailField = Pick<PasswordResetFields, 'email'>
// export type PasswordResetOtpField = Pick<PasswordResetFields, 'otp'>
// export type PasswordResetTokenField = Pick<PasswordResetFields, 'token'>

export const forgetPasswordAtom = atom<Partial<PasswordResetFields>>({
    key: "FORGET_PASSWORD",
    default: {
        email: '',
        // otp: '',
        // user: {
        //     id: '',
        //     collectionId: '',
        //     collectionName: '',
        //     created: '',
        //     updated: '',
        //     username: '',
        //     verified: false,
        //     emailVisibility: false,
        //     email: '',
        //     name: '',
        //     avatar: '',
        //     account_type: 'guest',
        //     is_disabled: false,
        //     report_count: 0,
        //     preferred_currency: 'NGN',
        //     phone: '',
        //     profile_image_url: '',
        // }
    }
})

export const forgetPasswordResetState = atom<"success" | "failed">({
    key: "FORGET_PASSWORD_RESET_STATE",
    default: "success"
})
// TODO: use this to check if reset was successful or not
