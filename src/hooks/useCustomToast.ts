import { useIonToast } from '@ionic/react'
import { warningOutline } from 'ionicons/icons'
import React from 'react'

const useCustomToast = () => {
    const [present, _] = useIonToast()

    /**
     * @param message 
     * @description - Display a toast at the top of the screen of type danger for duration of 3 seconds
     */
    function presentToastDanger(message: string): void {
        present({
            message,
            icon: warningOutline,
            color: 'danger',
            position: 'top',
            duration: 3000,
            mode: 'ios'
        })
    }


    return {
        presentToastDanger
    }
}

export default useCustomToast