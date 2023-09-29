import { IonButton, IonContent, IonIcon, IonPage, IonText } from '@ionic/react'
import { cloudOfflineOutline, refresh, refreshCircleOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import Settings from '../../helpers/settings'
import { _get } from '../../helpers/api'
import { useSetRecoilState } from 'recoil'
import { networkErrorAtom } from '../../atoms/networkErrorAtom'



const NetworkError = () => {
    const { serverBaseUrl } = Settings()
    const setNetworkNotFound = useSetRecoilState(networkErrorAtom)
    const [isLoading, setIsLoading] = useState(false)


    async function networkTest() {
        setIsLoading(true)
        try {
            const URL = `${serverBaseUrl}/`
            const { status } = await _get(URL)
            console.log("🚀 ~ file: NetworkError.tsx:22 ~ networkTest ~ status:", status)
            if (status === 200) {
                setIsLoading(false)
                setNetworkNotFound(false)
            }
            setIsLoading(false)
        }
        catch (error: any) {

        }
        setIsLoading(false)
    }


    return (
        <IonPage>
            <IonContent className='ion-padding ion-text-center'>
                <div className="h-75 d-flex flex-column align-items-center justify-content-center">
                    <IonIcon icon={cloudOfflineOutline} size='large' /> <br />
                    <h1 className='mt-3'>You're Offline</h1>
                    <IonText className='text-sm text-muted'>You seem to be offline, check your network and try again</IonText>
                    <IonButton
                        className='mt-4'
                        shape='round'
                        expand='block'
                        onClick={() => networkTest}
                        disabled={isLoading}
                        size='large'
                    >
                        {isLoading ? 'Connecting...' : 'Try again'}
                        <IonIcon icon={refresh} slot='end' />
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default NetworkError