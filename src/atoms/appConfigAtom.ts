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
        flw_test_pk: '',
        flw_test_sk: '',
        flw_test_ek: '',
        flw_live_pk: '',
        flw_live_sk: '',
        flw_live_ek: '',
        strp_test_pk: '',
        strp_test_sk: '',
        strp_live_pk: '',
        strp_live_sk: '',
        imgkit_pk: '',
        imgkit_sk: '',
        imgkit_url: '',
    }
})