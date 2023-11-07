import { IonContent, IonPage } from '@ionic/react'
import { useRecoilValue } from 'recoil'
import { forgetPasswordAtom } from '../../atoms/passwordResetAtom'
import RequestPasswordResetSuccessful from '../../components/RequestPasswordResetSuccessful'

import './RequestPasswordConfirm.css'

const RequestPasswordConfirm = () => {
    const { email } = useRecoilValue(forgetPasswordAtom)

    return (
        <IonPage>
            <IonContent className='ion-padding ' scrollY={false}>
                <section className='page_wrapper'>
                    <RequestPasswordResetSuccessful email={email!} />
                </section>
            </IonContent>
        </IonPage>
    )
}

export default RequestPasswordConfirm