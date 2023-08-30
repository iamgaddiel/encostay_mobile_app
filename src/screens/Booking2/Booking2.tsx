import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage, IonText, IonTextarea } from '@ionic/react'
import React from 'react'

import "../Booking1/Booking1.css"
import { cameraReverseOutline, shield, shieldOutline, warningOutline } from 'ionicons/icons'
import BackHeaderNoTitle from '../../components/BackHeaderNoTitle'
import { useRecoilState } from 'recoil'
import { bookingAtom } from '../../atoms/bookingAtom'

const Booking1 = () => {
    const [bookingDetail, setBookingDetail] = useRecoilState(bookingAtom)



    function handleExtraInfo(detail: string){
        setBookingDetail({
            ...bookingDetail,
            aditional_info: detail
        })
    }
    return (
        <IonPage>
            <BackHeaderNoTitle defaultHref='/booking_step_1' />
            <IonContent className='ion-padding' fullscreen>

                <section className="mt-3 booking_process ion-padding-horizontal">
                    <div className="booking_process_stage">1</div>
                    <div className="booking_process_stage_currnet">Step 2</div>
                    <div className="booking_process_stage">3</div>
                    {/* <div className="booking_process_stage">4</div> */}
                    {/* <div className="booking_process_stage">5</div> */}
                </section>

                <section className="mt-5 ion-padding">
                    <IonText className="fs-1">Tell your host about your trip</IonText>
                    <small className="ion-margin-top text-muted block">
                        Help your host prepare for your stay by answering their questions check in progress
                    </small>
                </section>

                <IonTextarea
                    placeholder="Type your message..."
                    className="mt-4 ion-padding shadow-sm rounded-4"
                    style={{ height: "20vh"}}
                    onIonChange={(e) => handleExtraInfo(e.detail?.value! as string)}
                />

                <IonButton
                    className='yellow_fill mt-4'
                    size='large'
                    shape="round"
                    routerDirection='forward'
                    routerLink='/booking_step_3'
                    expand='block'
                    mode='ios'
                >
                    Agree
                </IonButton>

            </IonContent>
        </IonPage>
    )
}

export default Booking1