import { useContext, useEffect, useState } from "react"
import { StoredUser, UserCollectionType } from "../@types/users"
import { getSaveData } from "../helpers/storageSDKs"
import { USER } from "../helpers/keys"


export default function useAuth() {
    const [token, setToken] = useState('')
    const [record, setRecord] = useState<UserCollectionType | null>(null)
    console.log("🚀 ~ file: useAuth.tsx:10 ~ useAuth ~ record:", record)



    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {
        const { record, token }: StoredUser = await getSaveData(USER)
        setToken(token)
        setRecord(record)
    }

    return {
        token,
        record
    }
}