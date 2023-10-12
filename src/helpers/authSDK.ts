import {  StoredUser } from "../@types/users"
import { _post } from "./api"
import { USRS_COLLECTION, USER } from "./keys"
import Settings from "./settings"
import { getSaveData } from "./storageSDKs"


const { pb, DEBUG } = Settings()





interface AuthenReturn {
    token?: string
    is_authenticated: boolean
    message?: string
    record?: any
}


export async function authenticate(email: string, password: string): Promise<AuthenReturn> {
    try {
        const url = `${pb.baseUrl}/collections/users/auth-with-password`

        const requestData = { identity: email, password }

        const headers = { 'Content-Type': 'application/json' }

        const { data: responseObject } = await _post(url, requestData, headers) // 1st level data

        const { data, code, token, record }: any = responseObject // 2nd level data

        // * Display cosole log if app in debug mode
        if (DEBUG)
            console.log("🚀 ~ file: authSDK.ts:44 ~ authenticate ~ responseObject:", responseObject)

        // ! Faid Authentication Checks
        if (code === 400 && data?.identity) {
            const { message } = data?.identity // 3rd level data
            return { is_authenticated: false, message: `Identity: ${message}` }
        }

        if (code === 400) {
            return { is_authenticated: false, message: `${responseObject?.message}` }
        }

        // * Display cosole log if app in debug mode
        if (DEBUG) {
            console.log("🚀 ~ file: authSDK.ts:18 ~ authenticate ~ record:", record)
            console.log("🚀 ~ file: authSDK.ts:18 ~ authenticate ~ token:", token)
        }

        return { token, record, is_authenticated: true }
    }
    catch (err) {
        return { is_authenticated: false, message: err as string }
    }
}


//TODO: give "data" params a type of CreateUser *FYI this type does not exist
export async function createUser(data: any) {
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
    const user = await getSaveData(USER) as StoredUser
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