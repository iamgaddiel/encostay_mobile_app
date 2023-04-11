import { IonToolbar, IonTitle, IonLabel, IonInput } from '@ionic/react'
import React from 'react'

const ResetPassword = () => {
    return (
        <>
            <IonToolbar className='ion-padding-0'>
                <IonTitle className='fw-500'>Reset Password</IonTitle>
            </IonToolbar>

            <div className="ion-padding mt-1">
                <p className='my-3 text-muted'>
                    Set the new password for your account so you can login and access all the features.
                </p>
            </div>


            {/* Rest Email */}
            <section className='ion-padding-horizontal mt-2'>
                <div className='form_inputs mt-4'>
                    <IonLabel>Password</IonLabel>
                    <IonInput type='password' className='mt-2 p-2' />
                </div>
                <div className='form_inputs mt-4'>
                    <IonLabel>Confirm Password</IonLabel>
                    <IonInput type='password' className='mt-2 p-2' />
                </div>
            </section>
        </>
    )
}

export default ResetPassword