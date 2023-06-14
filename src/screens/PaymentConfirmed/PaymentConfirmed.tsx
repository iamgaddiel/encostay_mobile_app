import React from 'react'
import BriefCase from "../../assets/images/illustration.svg"
import { IonButton, IonContent, IonImg, IonPage, IonText } from '@ionic/react'

//css
import "../PaymentProcessing/PaymentProcessing.css"

const PaymentConfirmed = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <section className='d-flex justify-content-center align-items-center payment_wrapper'>
                    <div className="">
                        <div className="reciving_wapper ion-text-center">
                            <IonImg src={BriefCase} />
                        </div>

                        <div className="mt-4 ion-text-center">
                            <IonText className='fs-1'>Receiving</IonText>
                            <small className="text-muted block mt-2">the property's confimation</small>
                        </div>

                        <div className="ion-text-center mt-5">
                            <IonButton
                                className='brown_fill'
                                size='large'
                                shape='round'
                                routerDirection='forward'
                                routerLink='/manage_bookings'
                            >
                                Manage Booking
                            </IonButton>
                        </div>
                    </div>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default PaymentConfirmed