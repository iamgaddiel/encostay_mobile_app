import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers, Storage } from '@ionic/storage';
import PocketBase from 'pocketbase'



/**
 *  NOTE: import PocketBasee and Storage in SettingContext file for to fix typing errors
 * 
 */
const appName = "Encostay"

const DEBUG = true

const LOCALHOST = "http://127.0.0.1:8090/api"

const REMOTE_URL = "https://encostay-app.pockethost.io/api"

const pocketbaseUrl = DEBUG ? LOCALHOST  : REMOTE_URL

const pb = new PocketBase(pocketbaseUrl)


// store data locally to db, indexDB or localstorage
const storage = new Storage({
    name:  `__${appName}`,
    driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
})

storage.create()


//TODO: get and save cloudinary config params



export default function Settings () {
    return {
        appName,
        storage,
        pb,
        DEBUG,
        pocketbaseUrl
    }
}

