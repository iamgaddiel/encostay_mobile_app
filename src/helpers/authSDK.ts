import { CreateUserType, StoredUser } from "../@types/users"
import { USRS_COLLECTION, USER } from "./keys"
import Settings from "./settings"
import { getSaveData } from "./storageSDKs"


const { pb } = Settings()




export async function authenticate(email: string, password: string) {
    try {
        const authData = await pb.collection(USRS_COLLECTION).authWithPassword(
            email,
            password
        )
        return authData

    } catch (err) {
        return err
    }
}

export async function createUser(data: CreateUserType) {
    try {
        const user = await pb.collection(USRS_COLLECTION).create(data)
        return user
    }
    catch (err: any) {
        if (err) {
            return err
        }
    }
}


export async function getStoredUser() {
    const user: StoredUser = await getSaveData(USER)
    return user
}


export function logout() {
    pb.authStore.clear()
}


export async function verifyEmail(email: string) {

}


export async function requestPasswordReset(collection: string, email: string) {

}


export async function confirmPasswordReset(collection: string, token: string, newPassword: string, confirmNewPassword: string) {

}