import { createContext, useState } from "react"
import Settings from "../helpers/settings"




export const StorageContext = createContext<StorageContextType | null>(null)



const StorageProvider: React.FC<{ children: any }> = ({ children }) => {

    const { storage } = Settings()

    const [data, setData] = useState<any>({})



    /**
     * --------------------------------------------------------------------
     * Functions
     * --------------------------------------------------------------------
     */

    async function saveData(key: string, data: any) {
        try {
            const user = await storage.set(key, data)
            return user
        }
        catch (err) {
            return err
        }
    }



    async function getSaveData(key: string) {
        try {
            return await storage.get(key)
        }
        catch (err) {
            if (err) return err
        }
    }


    async function clearData(key: string) {
        await storage.remove(key)
    }


    async function clearAll() {
        await storage.clear()
    }




    /**
     * --------------------------------------------------------------------
     * Functions
     * --------------------------------------------------------------------
     */




    return (
        <StorageContext.Provider value={{
            saveData,
            clearData,
            clearAll,
            getSaveData,
            data,
            setData
        }}>
            {children}
        </StorageContext.Provider>
    )
}

export type StorageContextType = {
    saveData(key: string, data: any): Promise<any>
    clearData: (key: string) => Promise<void>
    clearAll: () => Promise<void>
    getSaveData(key: string): Promise<any>
    data: any,
    setData: React.Dispatch<any>
}

export default StorageProvider


