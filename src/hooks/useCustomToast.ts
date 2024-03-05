import { useIonToast } from '@ionic/react'
import { checkboxOutline, warningOutline } from 'ionicons/icons'

const useCustomToast = () => {
    const [present, _] = useIonToast()

    /**
     * @param message 
     * @description Display a toast at the top of the screen of type danger for duration of 3 seconds
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


    /**
     * @param message 
     * @description Display a toast at the top of the screen of type success for duration of 3 seconds
     */
    function presentToastSuccess(message: string): void {
        present({
            message,
            icon: checkboxOutline,
            color: 'success',
            position: 'top',
            duration: 3000,
            mode: 'ios'
        })
    }


    return {
        presentToastDanger,
        presentToastSuccess
    }
}

export default useCustomToast