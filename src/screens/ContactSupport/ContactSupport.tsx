import { IonButton, IonContent, IonInput, IonLabel, IonPage, IonTextarea } from '@ionic/react'
import React from 'react'
import BackHeader from '../../components/BackHeader/BackHeader'

const ContactSupport = () => {
    return (
        <IonPage>
            <BackHeader title='Contact Support' backLink='/me' />
            <IonContent className='ion-padding' fullscreen>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <IonLabel>Enter Your Email</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="email" />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal' >
                    <IonLabel>Enter Message</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonTextarea
                            placeholder='Hi Team,....'
                            counter={true}
                            maxlength={200}
                            autoGrow
                            counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
                            className='ion-no-border'
                            mode='ios'
                        />
                    </div>
                </div>


                <IonButton
                    className="yellow_fill mt-5"
                    shape="round"
                    mode="ios"
                    expand='block'
                >
                    Send
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default ContactSupport