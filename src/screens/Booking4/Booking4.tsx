import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonText, IonIcon, IonButton } from '@ionic/react'
import { star, chevronForward, person, informationCircleOutline } from 'ionicons/icons'
import React from 'react'
import SpaceBetween from '../../components/style/SpaceBetween'
import BackHeaderNoTitle from '../../components/BackHeaderNoTitle/BackHeaderNoTitle'

import Image from "../../assets/images/room-pt.png"

const Booking4 = () => {
    return (
        <IonPage>

            <BackHeaderNoTitle defaultHref='/booking_step_3' />

            <IonContent className='ion-padding' >

                {/* Pagination */}
                <section className="mt-3 booking_process ion-padding-horizontal">
                    <div className="booking_process_stage">1</div>
                    <div className="booking_process_stage">2</div>
                    <div className="booking_process_stage">3</div>
                    <div className="booking_process_stage_currnet">Step 4</div>
                </section>

                {/* Home preview */}
                <section className='d-flex mt-5'>
                    <div className="preview_img rounded-4" style={{ backgroundImage: `url(${Image})` }}></div>
                    <div className='ml-5 align-between' style={{ alignItems: "space-between" }}>
                        <big>Perfect Room and all</big>
                        <IonText className='fs-3 block'>₦234/night</IonText>
                        <span className='d-flex align-items-center'>
                            <div className='fs-5'>
                                <IonIcon icon={star} color='warning' /> 4.8
                            </div>
                            <div className="text-muted mx-4">(234)</div>
                        </span>
                    </div>
                </section>

                {/* Checkin/checkout dates */}
                <section className="my-4 d-flex justify-content-between p-4 rounded-4" style={{ backgroundColor: "var(--white-4)" }}>
                    <div>
                        <IonText className='text-muted'>Check In</IonText>
                        <div className='rounded-3 p-2 mt-2 shadow-sm' style={{ width: "90px", backgroundColor: "white" }}>
                            <SpaceBetween>
                                <IonText className='text-muted'>Jan 3</IonText>
                                <IonIcon icon={chevronForward} />
                            </SpaceBetween>
                        </div>
                    </div>
                    <div>
                        <IonText className='text-muted'>Checkout</IonText>
                        <div className='rounded-3 p-2 mt-2 shadow-sm' style={{ width: "90px", backgroundColor: "white" }}>
                            <SpaceBetween>
                                <IonText className='text-muted'>Jan 3</IonText>
                                <IonIcon icon={chevronForward} />
                            </SpaceBetween>
                        </div>
                    </div>
                    <div>
                        <IonText className='text-muted'>Guets</IonText>
                        <div className='rounded-3 p-2 mt-2' style={{ width: "90px" }}>
                            <IonIcon icon={person} color={"warning"} /> <span className="text-muted">{2}</span>
                        </div>
                    </div>
                </section>


                <section className="rounded-4 p-4 mt-4" style={{ backgroundColor: "var(--light-red)" }}>
                    <IonText className='fw-bold text-muted'>Fee & Tax Details <IonIcon icon={informationCircleOutline} color={"warning"} className='mx-2' /></IonText>

                    <div className="mt-5">
                        <SpaceBetween className="my-3">
                            <IonText className="text-muted">$233 x 3 night</IonText>
                            <IonText className='fw-bold-sm'>$000</IonText>
                        </SpaceBetween>
                        <SpaceBetween className="my-3">
                            <IonText className="text-muted">Services Charges</IonText>
                            <IonText className='fw-bold-sm'>$000</IonText>
                        </SpaceBetween>
                    </div>

                    <div className='w-100 mt-4 border border-warning'></div>

                    <SpaceBetween className='mt-4'>
                        <IonText className='text-muted'>Total</IonText>
                        <div className="shadow-sm p-2 bg-light rounded-3 text-center" style={{ width: "80px", fontSize: '1.2rem' }}>
                            <IonText>$596</IonText>
                        </div>
                    </SpaceBetween>
                </section>


                <div className='ion-text-center mt-4'>
                    <IonButton
                        className='brown_fill'
                        shape='round'
                        size='large'
                        style={{ width: "12rem", height: "55px" }}
                        routerDirection='forward'
                        routerLink='/payment_prcessing'
                    >
                        Confirm
                    </IonButton>
                </div>

            </IonContent>
        </IonPage >
    )
}

export default Booking4