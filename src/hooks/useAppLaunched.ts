import React, { useEffect, useState } from 'react'
import { getSaveData, saveData } from '../helpers/storageSDKs'
import { LAUNCH_STATUS } from '../helpers/keys'

const useAppLaunched = () => {
    const [appLauned, setAppLaunched] = useState(false)


    useEffect(() => {
        getOrSetUserLaunchStatus()
    }, [])



    async function getOrSetUserLaunchStatus() {
        const appHasLaunchedBefore = await getSaveData(LAUNCH_STATUS)
        if (appHasLaunchedBefore) {
            setAppLaunched(true)
        }
        else {
            saveData(LAUNCH_STATUS, true)
        }
    }

    return { appLauned }
}

export default useAppLaunched