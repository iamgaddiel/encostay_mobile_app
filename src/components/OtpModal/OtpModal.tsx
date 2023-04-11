import { IonContent, IonToolbar, IonTitle, IonLabel, IonInput, IonButton } from '@ionic/react'
import React from 'react'

import "./OtpModal.css"


const OtpModal = () => {
    // TODO: go to the next input when one is filled

    
    return (
        <>
            <IonToolbar className='ion-padding-0'>
                <IonTitle className='fw-500'>Enter 4 Digit Code</IonTitle>
            </IonToolbar>

            <div className="ion-padding mt-1">
                <p
                    className='my-3 text-muted'>
                    Enter the 4 digits code that you received on your email.
                </p>
            </div>


            {/* Rest Email */}
            <div className='otp_inputs mt-2'>
                <IonInput
                    type='text'
                    inputMode='numeric'
                    className="otp_input w-25"
                    maxlength={1}
                />
                <IonInput
                    type='text'
                    inputMode='numeric'
                    className="otp_input w-25"
                    maxlength={1}
                />
                <IonInput
                    type='text'
                    inputMode='numeric'
                    className="otp_input w-25"
                    maxlength={1}
                />
                <IonInput
                    type='text'
                    inputMode='numeric'
                    className="otp_input w-25"
                    maxlength={1}
                />
            </div>
        </>
    )
}

export default OtpModal