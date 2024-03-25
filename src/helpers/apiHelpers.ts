import { HttpResponse } from "@capacitor/core";
import { _delete, _get, _patch, _post, _put } from "./api";
import Settings from "./settings";
import { recording } from "ionicons/icons";
import { USERS_COLLECTION } from "./keys";

const { pb, DEBUG } = Settings()


//TODO: covert this file to a Class with Methods


interface CreateCollection { response: any | null, isCreated: boolean, error?: any }


function parseHeader(userToken?: string): {} {
    const headers: any = {
        'Content-Type': 'application/json; charset=UTF-8'
    }
    // if (userToken) headers["Authorization"] = `Bearer ${userToken}`;
    if (userToken) headers["Authorization"] = `${userToken}`;
    return headers
}

// Create Collection
export async function createApiCollection(collection: string, formData: any, userToken?: string): Promise<CreateCollection> {
    try{
        const URL = `${pb.baseUrl}/collections/${collection}/records`
        const headers: any = parseHeader(userToken)
    
        const { data }: HttpResponse = await _post(URL, formData, headers)
        console.log("🚀 ~ file: apiHelpers.ts:31 ~ createApiCollection ~ data:", data)
        if (!data?.id) {
            return {
                response: data?.message,
                isCreated: false,
                error: data?.data
            }
        }
        return {
            response: data,
            isCreated: true
        }
    }
    catch( error: any){
        throw new Error(error)
    }
}


// Delete Collection
export function deleteApiCollection(collection: string, recordId: string, authToken: string): { isDeleted: boolean } {
    const URL = `${pb.baseUrl}/collections/${collection}/records/${recordId}`
    const HEADERS = parseHeader(authToken)
    const PARAMS = {}
    const res = _delete(URL, HEADERS, PARAMS)
    if (res !== null) return { isDeleted: true };
    return { isDeleted: false }
}


// Update Collection
export async function updateApiCollectionItem(collection: string, id: string, formData: {}, userToken: string): Promise<{ isUpdated: boolean, error: unknown | null, response: unknown | null }> {
    const URL = `${pb.baseUrl}/collections/${collection}/records/${id}`
    const headers: any = parseHeader(userToken)

    console.log(URL, headers, formData, userToken, '<-----')

    const { data }: HttpResponse = await _put(URL, formData, headers)
    if (data?.code !== 200) {
        return {
            isUpdated: false,
            response: null,
            error: data?.data
        }
    }
    return {
        isUpdated: true,
        error: null,
        response: data?.data
    }
}


export async function updatePatchApiCollectionItem(collection: string, id: string, formData: {}, userToken: string): Promise<{ isUpdated: boolean, error: unknown | null, response: unknown | null }> {
    const URL = `${pb.baseUrl}/collections/${collection}/records/${id}`
    const headers: any = parseHeader(userToken)

    const { data }: HttpResponse = await _patch(URL, formData, headers)
    if (data?.code !== 200) {
        return {
            isUpdated: false,
            response: null,
            error: data?.data
        }
    }
    return {
        isUpdated: true,
        error: null,
        response: data?.data
    }
}


export async function updatePatchApiCollectionItemNoAuth(collection: string, id: string, formData: {}): Promise<{ isUpdated: boolean, error: unknown | null, response: unknown | null }> {
    const URL = `${pb.baseUrl}/collections/${collection}/records/${id}`
    const headers: any = parseHeader()

    const { data }: HttpResponse = await _patch(URL, formData, headers)
    if (data?.code !== 200) {
        return {
            isUpdated: false,
            response: null,
            error: data?.data
        }
    }
    return {
        isUpdated: true,
        error: null,
        response: data?.data
    }
}


// Get Collection
export async function getApiCollectionItem(collection: string, recordId: string, userToken?: string, params?: {}): Promise<{ response: unknown, error: unknown | null }> {
    const URL = `${pb.baseUrl}/collections/${collection}/records/${recordId}`
    const headers: any = parseHeader(userToken)
    
    const { data, status } = await _get(URL, headers, params) as HttpResponse
    if (status !== 200) {
        return {
            response: data?.message,
            error: data?.data
        }
    }
    return {
        response: data,
        error: null
    }
}



// List Collection
export async function listApiCollection(collection: string, authToken: string, params?: {}): Promise<{ data: unknown }> {
    const URL = `${pb.baseUrl}/collections/${collection}/records`
    const HEADERS = { 'Authorization': authToken }
    try {
        const data = await _get(URL, HEADERS, params)
        if (data !== null) return data;
        return data
    }
    catch (err: unknown) {
        return { data: err }
    }
}

// List Collection
export async function listApiCollectionNoAuth(collection: string, params?: {}): Promise<{ data: unknown }> {
    const URL = `${pb.baseUrl}/collections/${collection}/records`
    const HEADERS = {}
    try {
        const data = await _get(URL, HEADERS, params)
        if (data !== null) return data;
        return data
    }
    catch (err: unknown) {
        return { data: err }
    }
}


export async function sendPasswordResetToken(email: string){
    const URL = `${pb.baseUrl}/collections/${USERS_COLLECTION}/request-password-reset`
    const payload = {email}
    try {
        const data = await _post(URL, payload)
        if (data !== null) return data;
        console.log("🚀 ~ file: apiHelpers.ts:145 ~ sendApiOtp ~ data:", data)
        return data
    }
    catch (err: unknown) {
        return { data: err }
    }
}

