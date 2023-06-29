import Settings from "./settings";


const { storage } = Settings()




// functions found in this file are SDKs inteface which enables
// storage to local db, IndexDB or LocalStorage
//


export async function saveData(key: string, data: any) {
    try {
        return await storage.set(key, data)
    }
    catch (err) {
        return err
    }
}


export async function getSaveData(key: string) {
    try {
        return await storage.get(key)
    }
    catch (err) {
        if (err) return err
    }
}


export async function clearData(key: string) {
    await storage.remove(key)
}


export async function clearAll() {
    await storage.clear()
}


