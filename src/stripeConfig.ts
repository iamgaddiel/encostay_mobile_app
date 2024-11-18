import { AppConfig, AppConfigList } from "./@types/appConfig";
import { _get } from "./helpers/api";
import Settings from "./helpers/settings";


const { pb, DEBUG } = Settings()




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


