import { atom } from "recoil";
import { AppConfig } from "../@types/appConfig";



export const appConfigAtom = atom<AppConfig>({
    key: 'CONFIG',
    default: {
        id: '',
        collectionId: '',
        collectionName: '',
        created: '',
        updated: '',
        app_name: '',
        service_charge: 0,
        website: '',
        app_lang: '',
        app_currency: '',
    }
})