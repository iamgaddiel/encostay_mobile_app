import { IonButton, IonContent, IonImg, IonInput, IonLabel, IonPage } from '@ionic/react'
import React from 'react'
import BackHeader from '../../components/BackHeader/BackHeader'
import SpaceBetween from '../../components/style/SpaceBetween'


import MC from "../../assets/images/label.svg"

const AddPaymentMethod = () => {
    return (
        <IonPage>
            <BackHeader title='Add Card' backLink='/bank_account' />
            <IonContent className='ion-padding' fullscreen>
                <div className='ion-margin-vertical ion-padding-horizontal mt-5'>
                    <IonLabel>Card Name</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" placeholder='John Doe Kendy' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal mt-5' >
                    <IonLabel>Card Name</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <SpaceBetween>
                            <IonInput type="text" placeholder='1234567890' />
                            <IonImg src={MC} />
                        </SpaceBetween>
                    </div>
                </div>

                <SpaceBetween className='mt-3'>
                    <div className='ion-margin-vertical ion-padding-horizontal w-50 mx-3'>
                        <IonLabel>Expiry Date</IonLabel>
                        <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput type="date" />
                        </div>
                    </div>
                    <div className='ion-margin-vertical ion-padding-horizontal w-50 mx-3'>
                        <IonLabel>CVV</IonLabel>
                        <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput type="password" />
                        </div>
                    </div>
                </SpaceBetween>


                <small className="block mt-1 text-muted ion-padding-horizontal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, cumque?
                </small>

                <IonButton
                    className="yellow_fill mt-3"
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

export default AddPaymentMethod