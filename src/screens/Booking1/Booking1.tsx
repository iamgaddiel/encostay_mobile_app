import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage, IonText } from '@ionic/react'
import React from 'react'
import BackHeaderNoTitle from '../../components/BackHeaderNoTitle/BackHeaderNoTitle'

import "./Booking1.css"
import { cameraReverseOutline, shield, shieldOutline, warningOutline } from 'ionicons/icons'
import SpaceBetween from '../../components/style/SpaceBetween'

const Booking1 = () => {
    return (
        <IonPage>
            <BackHeaderNoTitle defaultHref='booking_step_1' />
            <IonContent className='ion-padding' fullscreen>

                <section className="mt-3 booking_process ion-padding-horizontal">
                    <div className="booking_process_stage_currnet">Step 1</div>
                    <div className="booking_process_stage">2</div>
                    <div className="booking_process_stage">3</div>
                    <div className="booking_process_stage">4</div>
                    <div className="booking_process_stage">5</div>
                </section>

                <section className="mt-5 ion-padding">
                    <IonText className="fs-1">Book your stay</IonText>
                    <section className="ion-margin-top d-flex justify-content-between p-2 rounded-4" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonText className='text-muted'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, corporis omnis necessitatibus deleniti doloremque alias.
                        </IonText>
                    </section>
                </section>

                <section className="mt-4 ion-padding">
                    <IonText className="fs-4">3 nights in Pefect Room</IonText>

                    <div className="d-flex align-items-center mt-4">
                        {/* Date */}
                        <div className="booking_calander rounded-5 h">
                            <div className="rounded-4 ion-text-center booking_calander_item">
                                <IonText className='text-muted'>Jan</IonText>
                                <IonText className='fw-bold block fs-4' style={{ marginTop: "1px" }}>3</IonText>
                            </div>
                            <div className="rounded-4 ion-text-center booking_calander_item mt-4">
                                <IonText className='text-muted'>Jan</IonText>
                                <IonText className='fw-bold block fs-4' style={{ marginTop: "1px" }}>3</IonText>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="booking_time mx-4">
                            <div className="rounded-4 ion-text-center booking_time_item">
                                <IonText className='text-muted'>Friday Checking</IonText>
                                <IonText className='block fs-4' style={{ marginTop: "1px" }}>1PM - 7PM</IonText>
                            </div>
                            <div className="rounded-4 ion-text-center booking_time_item mt-4">
                                <IonText className='text-muted'>Tuesday Check out</IonText>
                                <IonText className='block fs-4' style={{ marginTop: "1px" }}>1PM - 7PM</IonText>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-3">
                    <IonAccordionGroup mode='ios' className=''>
                        <IonAccordion value='accomodation_type' className='rounded-5'>
                            <IonItem slot="header" color="light" className='ion-padding' lines='none'>
                                <IonText>Things to keep in mind</IonText>
                            </IonItem>

                            <div className="ion-padding" slot="content">
                                <SpaceBetween className='my-2'>
                                    <div className='bg-light rounded-3 p-2'>
                                        <IonIcon icon={warningOutline} color="warning" size='large' />
                                    </div>
                                    <IonText className='ml-4'>
                                        Guns or other dangerouse things are not allowed.
                                    </IonText>
                                </SpaceBetween>
                                <SpaceBetween className='my-2'>
                                    <div className='bg-light rounded-3 p-2'>
                                        <IonIcon icon={cameraReverseOutline} color="warning" size='large' />
                                    </div>
                                    <IonText className=''>
                                        Cameras are not allowed.
                                    </IonText>
                                </SpaceBetween>
                                <SpaceBetween className='my-2'>
                                    <div className='bg-light rounded-3 p-2'>
                                        <IonIcon icon={shieldOutline} color="warning" size='large' />
                                    </div>
                                    <IonText className='ml-4'>
                                        Disturbing other Guets is not allowed.
                                    </IonText>
                                </SpaceBetween>
                            </div>
                        </IonAccordion>
                    </IonAccordionGroup>
                </section>

                {/* Revies */}
                <section className="mt-4 ion-padding">
                    <div className='ion-padding shadow rounded-5'>
                        <SpaceBetween>
                            <big><IonText>$235/night</IonText></big>
                            <IonButton
                                className='brown_fill'
                                size='large'
                                shape="round"
                                routerDirection='forward'
                                routerLink='/booking_step_2'
                            >
                                Agree
                            </IonButton>
                        </SpaceBetween>
                    </div>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default Booking1