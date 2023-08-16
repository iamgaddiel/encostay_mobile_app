import { HttpResponse } from "@capacitor/core";
import { _delete, _get, _post, _put } from "./api";
import Settings from "./settings";
import { recording } from "ionicons/icons";

const { pb, DEBUG } = Settings()


//TODO: covert this file to a Class with Methods


interface CreateCollection { response: any | null, isCreated: boolean, error?: any }


function pareseHeader(userToken?: string): {} {
    const headers: any = {
        'Content-Type': 'application/json; charset=UTF-8'
    }
    // if (userToken) headers["Authorization"] = `Bearer ${userToken}`;
    if (userToken) headers["Authorization"] = `${userToken}`;
    return headers
}

// Create Collection
export async function createApiCollection(collection: string, formData: any, userToken?: string): Promise<CreateCollection> {
    // const URL = `${pb.baseUrl}${urlRelPath}`
    const URL = `${pb.baseUrl}/collections/${collection}/records`
    const headers: any = pareseHeader(userToken)

    const { data }: HttpResponse = await _post(URL, formData, headers)
    if (data?.code !== 200) {
        return {
            response: data?.message,
            isCreated: false,
            error: data?.data
        }
    }
    return {
        response: data?.data,
        isCreated: true
    }
}


// Delete Collection
export function deleteApiCollection(collection: string, recordId: string, authToken: string): { isDeleted: boolean } {
    const URL = `${pb.baseUrl}/collections/${collection}/records/${recordId}`
    const HEADERS = pareseHeader(authToken)
    const PARAMS = {}
    const res = _delete(URL, HEADERS, PARAMS)
    if (res !== null) return { isDeleted: true };
    return { isDeleted: false }
}


// Update Collection
export async function updateApiCollectionItem(collection: string, id: string, formData: {}, userToken: string): Promise<{ isUPdated: boolean, error: unknown | null, response: unknown | null }> {
    const URL = `${pb.baseUrl}/collections/${collection}/records/${id}`
    const headers: any = pareseHeader(userToken)

    const { data }: HttpResponse = await _put(URL, formData, headers)
    if (data?.code !== 200) {
        return {
            isUPdated: false,
            response: null,
            error: data?.data
        }
    }
    return {
        isUPdated: true,
        error: null,
        response: data?.data
    }
}


// Get Collection
export async function getApiCollectionItem(collection: string, recordId: string, userToken?: string): Promise<{ response: unknown, error: unknown | null }> {
    const URL = `${pb.baseUrl}/collections/${collection}/records/${recordId}`
    const headers: any = pareseHeader(userToken)
    const { data, status } = await _get(URL, headers) as HttpResponse
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

