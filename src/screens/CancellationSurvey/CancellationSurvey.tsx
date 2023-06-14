import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonRadio, IonRadioGroup, IonText, IonTitle } from '@ionic/react'
import React, { useRef, useState } from 'react'
import BackHeader from '../../components/BackHeader/BackHeader'
import SpaceBetween from '../../components/style/SpaceBetween'
import { informationCircleOutline, personCircle } from 'ionicons/icons'

// css
import "./CancellationSurvey.css"
import { useHistory } from 'react-router'


const CancellationSurvey = () => {
    const history = useHistory()

    // values
    const DATES_CHANGED = "dates_changed"
    const DUAL_BOOKING = "dual_changed"
    const CHOICE_CHANGED = "choice_changed"
    const TRIP_CANCELLED = "trip_cancelled"

    // states
    const [surveyReason, setSurveyReason] = useState("")
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    //modal
    const cancelationModal = useRef<HTMLIonModalElement>(null);

    function dismiss() {
        cancelationModal.current?.dismiss();
    }


    return (
        <IonPage>
            <BackHeader backLink='/manage_booking_preview' title='Cancellation sruvey' />
            <IonContent className='ion-padding'>

                {/* Modal */}
                <IonModal
                    id="cancellation_modal"
                    ref={cancelationModal}
                    trigger="open-custom-dialog"
                    isOpen={showConfirmationModal}
                    onDidDismiss={() => setShowConfirmationModal(false)}
                >
                    <div className="wrapper ion-padding">
                        {/* <div className="py-2">
                            <IonTitle>Perfect Room, East <br /> Vilage Dream</IonTitle>
                        </div> */}

                        <section className="mt-3 ion-padding rounded-4 p-3" style={{ backgroundColor: "var(--light-red)" }}>
                            <IonText className='text-muted fw-bold'>Cancellation cost </IonText>

                            <div className="mt-3">
                                <SpaceBetween className="my-3">
                                    <IonText className="text-muted">Room</IonText>
                                    <IonText className='fw-bold-sm'>free</IonText>
                                </SpaceBetween>
                                <SpaceBetween className="my-3">
                                    <IonText className="text-muted">Services Charges</IonText>
                                    <IonText className='fw-bold-sm'>₦14</IonText>
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

                        <SpaceBetween className='mt-3'>
                            <IonButton
                                className='brown_fill_outline w-50 mx-2'
                                shape='round'
                                onClick={dismiss}
                                // onClick={() => setShowConfirmationModal(false)}
                            >
                                Close
                            </IonButton>
                            <IonButton
                                className='brown_fill w-50 mx-2'
                                shape='round'
                                routerDirection='forward'
                                routerLink='/manage_bookings'
                                // onClick={() => history.push("/manage_bookings")}
                            >
                                Confirm
                            </IonButton>
                        </SpaceBetween>
                    </div>
                </IonModal>


                {/* Cancellation Notice */}
                <section className="rounded-4 ion-padding text-danger" style={{ backgroundColor: "var(--light-red)" }}>
                    <p>Your booking won't be conceled until you answer this survey question.</p>
                </section>

                {/* cancellation reason */}
                <section className='mt-4'>
                    <IonTitle>Tell us your reason for canceling</IonTitle>


                    <IonList>
                        <IonRadioGroup value={surveyReason}>
                            <IonItem lines='none' className='ion-no-padding'>
                                <IonCard className="w-100" mode='ios'>
                                    <IonCardContent className=''>
                                        <SpaceBetween>
                                            <IonText className='w-50'>Change fo dates for destination</IonText>
                                            <IonRadio slot="end" value={() => setSurveyReason(DATES_CHANGED)} />
                                        </SpaceBetween>
                                    </IonCardContent>
                                </IonCard>
                            </IonItem>
                            <IonItem lines='none' className='ion-no-padding'>
                                <IonCard className="w-100" mode='ios'>
                                    <IonCardContent className=''>
                                        <SpaceBetween>
                                            <IonText className='w-100'>Made booking for the smae dates - canceled the ones I don't need</IonText>
                                            <IonRadio slot="end" value={() => setSurveyReason(DUAL_BOOKING)} />
                                        </SpaceBetween>
                                    </IonCardContent>
                                </IonCard>
                            </IonItem>
                            <IonItem lines='none' className='ion-no-padding'>
                                <IonCard className="w-100" mode='ios'>
                                    <IonCardContent className=''>
                                        <SpaceBetween>
                                            <IonText className='w-75'>Found a differnet accommodation option</IonText>
                                            <IonRadio slot="end" value={() => setSurveyReason(CHOICE_CHANGED)} />
                                        </SpaceBetween>
                                    </IonCardContent>
                                </IonCard>
                            </IonItem>
                            <IonItem lines='none' className='ion-no-padding'>
                                <IonCard className="w-100" mode='ios'>
                                    <IonCardContent className=''>
                                        <SpaceBetween>
                                            <IonText className='w-75'>Personal reasons / Trip called off</IonText>
                                            <IonRadio slot="end" value={() => setSurveyReason(TRIP_CANCELLED)} />
                                        </SpaceBetween>
                                    </IonCardContent>
                                </IonCard>
                            </IonItem>
                        </IonRadioGroup>
                    </IonList>
                </section>


                {/* Confrimation Moddal */}

                <div className='ion-text-center my-4'>
                    <IonButton
                        className='brown_fill'
                        shape='round'
                        size='large'
                        style={{ width: "12rem", height: "55px" }}
                        id={"open-custom-dialog"}
                        onClick={() => setShowConfirmationModal(true)}
                    >
                        Continue
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default CancellationSurvey