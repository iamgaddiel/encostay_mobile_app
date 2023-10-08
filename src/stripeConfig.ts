import { AppConfig, AppConfigList } from "./@types/appConfig";
import { _get } from "./helpers/api";
import Settings from "./helpers/settings";


const { pb, DEBUG } = Settings()


type StripeKeys = {
    stripeSecretKey: string | null
    stripePublishableKey: string | null
}

let stripeKeys: StripeKeys

try{
    

    const url = `${pb.baseUrl}/collections/app_config/records`
    
    const options = {
        filter: `app_name="EncoStay"`
    }

    // get app config from pocketbase server
    
    const headers = {
        
    }

    const { data } = await _get(url, headers, options)
    console.log("🚀 ~ file: stripeConfig.ts:32 ~ data:", data)
    
    const { items } = data as AppConfigList
    
    const { strp_live_pk, strp_live_sk, strp_test_pk, strp_test_sk} = items[0] 
    
    const stripePublishableKey  = DEBUG ? strp_test_pk : strp_live_pk
    const stripeSecretKey = DEBUG ? strp_test_sk : strp_live_sk

    stripeKeys  = { stripePublishableKey,  stripeSecretKey};
    console.log("🚀 ~ file: stripeConfig.ts:37 ~ stripeKeys:", stripeKeys)
}
catch(error: any){
    stripeKeys  = { stripePublishableKey: null,  stripeSecretKey: null};
    console.error("🚀 ~ file: stripeConfig.ts:41 ~ stripeKeys:", stripeKeys)
}

export {
    stripeKeys
}


