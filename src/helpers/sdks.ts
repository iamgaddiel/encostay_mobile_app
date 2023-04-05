import Settings from './settings'


const { pb, pocketbaseUrl } = Settings()


// POCKETBASE SDKs


export async function listCollection(collection: string, batchSize = 200, relFields?: string) {
    try {
        const records = await pb
            .collection(collection)
            .getFullList(batchSize, {
                sort: 'created',
            });
        return records
    }
    catch (error: any) {
        if (error) throw new Error(error);
        return error
    }
}


export async function filterCollection(
    collection: string,
    filterParams: string,
    min = 1,
    max = 50,
    relFields?: string,
    // cancelKey = 'key',
    // disableCancelkey = false,
) {
    try {
        const filteredResult = await pb.collection(collection).getList(min, max, {
            filter: filterParams,
            // '$cancelKey': disableCancelkey ? disableCancelkey : cancelKey
            '$autoCancel': false,
            expand: relFields
        });
        return filteredResult
    }
    catch (error: any) {
        if (error) throw new Error(error)
        return error
    }
}


export async function getItem(collection: string, recordId: string, relFields?: string) {
    try {
        const record = pb.collection(collection).getOne(recordId, {
            expand: relFields,
        });
        return record

    } catch (error: any) {
        if (error) throw new Error(error)
        return error
    }

}


export async function deleteItem(collection: string, recordId: string) {
    try {
        await pb.collection(collection).delete(recordId);
        return true
    } catch (error: any) {
        if (error) throw new Error(error);
        return false;
    }
}


export async function createItem(collection: string, data: {}) {
    try {
        const record = await pb.collection(collection).create(data);
        return { record, isCreated: true }
    }
    catch (error: any) {
        if (error) throw new Error(error)
        return { isCreated: false }
    }
}


export async function updateItem(collection: string, recordId: string, data: {}) {
    try {
        const record = await pb.collection(collection).update(recordId, data);
        return record
    } catch (error: any) {
        if (error) throw new Error(error)
    }
}


export function getFileDownloadUrl(filename: string, collectionId: string, recordId: string) {
    // http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME
    const downloadEndpoint = `${pocketbaseUrl}/api/files/${collectionId}/${recordId}/${filename}`
    return downloadEndpoint
}

