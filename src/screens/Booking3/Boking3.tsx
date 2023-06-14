import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonText, IonTextarea, IonThumbnail } from '@ionic/react'
import React from 'react'

import "../Booking1/Booking1.css"
import BackHeaderNoTitle from '../../components/BackHeaderNoTitle'
import Image from "../../assets/images/twemoji_flag-for-flag-nigeria.svg"

// css
import "./Booking3.css"

const Booking1 = () => {
    return (
        <IonPage>
            <BackHeaderNoTitle defaultHref='/booking_step_2' />
            <IonContent className='ion-padding' fullscreen>

                <section className="mt-3 booking_process ion-padding-horizontal">
                    <div className="booking_process_stage">1</div>
                    <div className="booking_process_stage">2</div>
                    <div className="booking_process_stage_currnet">Step 3</div>
                    <div className="booking_process_stage">4</div>
                </section>

                <section className="mt-5 ion-padding">
                    <IonText className="fs-1">Confirm your phone number</IonText>
                </section>

                <div className="mt-4 shadow-sm rounded-4 p-4">
                    <IonLabel>Phone Number</IonLabel>
                    <div className="d-flex align-items-center">
                        <div className='number_verification_image_wrapper'>
                            <IonImg src={Image} />
                        </div>
                        <IonInput
                            placeholder="070x xxxx xxx"
                            className='border-bottom ml-2'
                            inputMode='numeric'
                        />
                    </div>

                </div>

                <IonButton
                    className='yellow_fill mt-4'
                    size='large'
                    shape="round"
                    routerDirection='forward'
                    routerLink='/booking_step_4'
                    expand='block'
                    mode='ios'
                >
                    Confrim
                </IonButton>

            </IonContent>
        </IonPage>
    )
}

export default Booking1