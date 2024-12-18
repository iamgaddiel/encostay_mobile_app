import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers, Storage } from '@ionic/storage';
import PocketBase from 'pocketbase'



/**
 *  NOTE: import PocketBasee and Storage in SettingContext file for to fix typing errors
 * 
 */
const appName = "Encostay"

const DEBUG = true


// POCKETBASE SERVER CONFIG
const PB_LOCALHOST = "http://127.0.0.1:8090/api"

const PB_REMOTE_URL = 'https://encostay-mobile.pockethost.io/api'

const pocketbaseUrl = DEBUG ? PB_LOCALHOST : PB_REMOTE_URL

const pb = new PocketBase(pocketbaseUrl)



// BACKEND SERVER CONFIG 
const LOCAL_SERVER_URL = 'http://localhost:3000'

// const REMOTE_SERVER_URL = 'https://encostay-saver.onrender.com'
const REMOTE_SERVER_URL = 'monkfish-app-334nx.ondigitalocean.app'

// const serverBaseUrl = LOCAL_SERVER_URL

const serverBaseUrl = DEBUG ? LOCAL_SERVER_URL : REMOTE_SERVER_URL




// store data locally to db, indexDB or localstoragee
const storage = new Storage({
    name: `__${appName}`,
    driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
})

storage.create()


//TODO: get and save cloudinary config params



export default function Settings() {
    return {
        appName,
        storage,
        pb,
        DEBUG,
        pocketbaseUrl,
        serverBaseUrl
    }
}

