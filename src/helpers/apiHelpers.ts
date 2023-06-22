import { _delete, _get, _post } from "./api";
import Settings from "./settings";

const { pb, DEBUG } = Settings()



// Create Collection
export async function createApiCollection(urlRelPath: string, formData: any): Promise<{ response: any | null, isCreated: boolean, error?: any }> {
    const URL = `${pb.baseUrl}${urlRelPath}`
    const headers = {
        'Content-Type': 'application/json'
    }

    const { data }: any = await _post(URL, formData, headers)
    console.log("🚀 ~ file: apiHelpers.ts:14 ~ createApiCollection ~ res:", data)
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
export function deleteApiCollection(urlRelPath: string, data: any): { isDeleted: boolean } {
    const URL = `${pb.baseUrl}/${urlRelPath}`
    const HEADERS = {}
    const PARAMS = {}
    const res = _delete(URL, HEADERS, PARAMS)
    if (res !== null) return { isDeleted: true };
    return { isDeleted: false }
}


// Update Collection


// Get Collection


// List Collection
export async function listApiCollection(urlRelPath: string): Promise<{ data: any }> {
    const URL = `${pb.baseUrl}/${urlRelPath}`
    const PARAMS = {}
    try {
        const data = await _get(URL, PARAMS)
        if (data !== null) return data;
        return data
    }
    catch (err: any) {
        return { data: err}
    }
}

