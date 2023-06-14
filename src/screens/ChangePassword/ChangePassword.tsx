import { IonButton, IonContent, IonInput, IonLabel, IonPage } from '@ionic/react'
import React from 'react'
import BackHeader from '../../components/BackHeader/BackHeader'

const ChangePassword = () => {
    return (
        <IonPage>
            <BackHeader backLink='/me' title='Chnage Password' />

            <IonContent className='ion-padding' fullscreen>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <IonLabel>Enter Current Password</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="password" />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal' >
                    <IonLabel>Enter New Password</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="password" />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <IonLabel>Confirm Password</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="password" />
                    </div>
                </div>
                <small className="block mt-1 text-muted ion-padding-horizontal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, cumque?
                </small>

                <IonButton
                    className="yellow_fill mt-5"
                    shape="round"
                    mode="ios"
                    size="large"
                    expand='block'
                >
                    Confirm
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default ChangePassword