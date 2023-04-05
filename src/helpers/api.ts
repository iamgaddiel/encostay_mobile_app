import { CapacitorHttp, HttpResponse } from '@capacitor/core';


// Example of a GET request
export async function _get(url: string, headers?: {}, params?: {}) {
    const options = { url, headers, params };

    try {
        const response: HttpResponse = await CapacitorHttp.get(options);
        return response;
    }
    catch (err: any) {
        throw new Error(err)
    }
};


export async function _post(url: string, data: {}, headers?: {}, params?: {}) {
    const options = {
        url,
        headers,
        data: JSON.stringify(data),
        params
    };

    try {
        const response: HttpResponse = await CapacitorHttp.post(options);
        return response

    } catch (err: any) {
        throw new Error(err)
    }

};


export async function _put(url: string, data: {}, headers?: {}, params?: {}) {
    const options = {
        url,
        headers,
        data: JSON.stringify(data),
        params
    };

    try {
        const response: HttpResponse = await CapacitorHttp.put(options);
        return response

    } catch (err: any) {
        throw new Error(err)
    }

};


export async function _delete(url: string, headers?: {}, params?: {}) {
    const options = {
        url,
        headers,
        params
    };

    try {
        const response: HttpResponse = await CapacitorHttp.delete(options);
        return response

    } catch (err: any) {
        throw new Error(err)
    }

};