import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Drivers, Storage } from '@ionic/storage';
import PocketBase from 'pocketbase'



/**
 * INSTALLATION PACKAGES
 * [Yarn]
 *  yarn add cordova-sqlite-storage localforage-cordovasqlitedriver @ionic/storage 
 * 
 * [NPM]
 * npm install cordova-sqlite-storage localforage-cordovasqlitedriver @ionic/storage 
 */


// Enter APP_NAME
const appName = ''

const DEBUG = false

// Pocketbase local server URL
const PB_LOCALHOST = ''

// Pocketbase remote server URL
const PB_REMOTE_URL = ''

const pocketbaseUrl = DEBUG ? PB_LOCALHOST : PB_REMOTE_URL

const pb = new PocketBase(pocketbaseUrl)


// URL for hosted backend server
const REMOTE_SERVER_URL = ''

// URL for local backend server
const LOCAL_SERVER_URL = 'http://localhost:3000'

// const serverBaseUrl = LOCAL_SERVER_URL

const serverBaseUrl = DEBUG ? LOCAL_SERVER_URL : REMOTE_SERVER_URL


// store data locally to db, indexDB or localstorage
const storage = new Storage({
    name: `__${appName}`,
    driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
})

storage.create()



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

