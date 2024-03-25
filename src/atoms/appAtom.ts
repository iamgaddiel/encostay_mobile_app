import { atom } from "recoil";
import { StoredUser } from "../@types/users";




export const userAtom = atom<StoredUser>({
    key: 'USER',
    default: {
        token: "",
        record: {
            id: "",
            collectionId: "",
            collectionName: "",
            created: "",
            updated: "",
            username: "",
            verified: false,
            emailVisibility: false,
            email: "",
            name: "",
            avatar: "",
            account_type: 'host',
            is_disabled: false,
            report_count: 0,
            phone: "",
            preferred_currency: 'NGN'
        }
    }
})


export const appStateTrigger = atom({
    key: 'STATE_CHANGE',
    default: false
})