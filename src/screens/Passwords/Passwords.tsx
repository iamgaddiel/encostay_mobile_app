import { IonButton, IonContent, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'

const Passwords = () => {
    // TODO: handle registraion form submition here
    // TODO: complete registrationSignal and submit
    // TODO: change button font to Nunito Sans

    return (
        <IonPage>
            <IonContent className='ion-padding'>
                <IonToolbar className='my-5'>
                    <IonTitle className='ion-text-center'>Set Password</IonTitle>
                </IonToolbar>

                <section className='mt-3 ion-padding'>
                    {/* password */}
                    <div className='form_inputs my-4  mt-4'>
                        <IonLabel>Password</IonLabel>
                        <IonInput type='password' placeholder='..............' className='mt-2 p-2 mx-0' />
                    </div>
                    {/* confirm password */}
                    <div className='form_inputs my-4  mt-4'>
                        <IonLabel>Confirm Password</IonLabel>
                        <IonInput type='password' placeholder='..............' className='mt-2 p-2 mx-0' />
                    </div>
                    <div className='text-muted'>
                        <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae quam nostrum blanditiis aliquid!</small>
                    </div>
                </section>

                <section className="mt-4 ion-padding">
                    <IonButton
                        expand='block'
                        shape='round'
                        className='nm_btn yellow_fill mt-5 w-100 fw-700'
                        mode='ios'
                        routerDirection='forward'
                        routerLink='/passwords'
                    >
                        Continue
                    </IonButton>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default Passwords