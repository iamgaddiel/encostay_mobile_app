import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonRadio, IonRadioGroup, IonText, IonTitle } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import BackHeader from '../../components/BackHeader/BackHeader'
import SpaceBetween from '../../components/style/SpaceBetween'
import { informationCircleOutline, personCircle } from 'ionicons/icons'

// css
import "./CancellationSurvey.css"
import { useHistory, useParams } from 'react-router'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userAtom } from '../../atoms/appAtom'
import { BookingItem } from '../../@types/bookings'
import { getBookingDetail, getBookings } from '../../helpers/utils'
import { APP_CONFIG, BOOKINGS_COLLECTION, SELECTED_BOOKING_FOR_CANCELATION } from '../../helpers/keys'
import { getSaveData } from '../../helpers/storageSDKs'
import { AppConfig } from '../../@types/appConfig'
import { appartmnetBookingAtom } from '../../atoms/bookingAtom'
import { updateApiCollectionItem } from '../../helpers/apiHelpers'



const CancellationSurvey = () => {
    //TODO: if survey is canceled refund guest money to account using selected payment method
    const { bookingId } = useParams<{ bookingId: string }>()
    const history = useHistory()



    // states
    const [surveyReason, setSurveyReason] = useState("")
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [booking, setBooking] = useState<BookingItem>()
    const [cancelBookingPrice, setCancelBookingPrice] = useState(0)
    const [showPrompt, setShowPrompt] = useState({
        enabled: false,
        message: ''
    })

    // Atoms
    const { token } = useRecoilValue(userAtom)
    const selectedApartmentBooking = useRecoilValue(appartmnetBookingAtom)

    //modal
    const cancelationModal = useRef<HTMLIonModalElement>(null);




    useEffect(() => {
        fetchBookingDetails()
    }, [])



    async function fetchBookingDetails(): Promise<void> {

        const booking = await getSaveData(SELECTED_BOOKING_FOR_CANCELATION) as BookingItem
        setBooking(booking)

        // calculate cancellation charge
        const cancelationCost = parseInt(
            (booking?.price! * CANCELATION_CHARGEE_PERCENTAGE).toFixed(3)
        )
        setCancelBookingPrice(cancelationCost)
    }


    function dismiss() {
        cancelationModal.current?.dismiss();
    }


    async function handleBookingCancellation() {
        const refundAmount = booking?.price! - cancelBookingPrice

        const updateData = {
            is_canceled: true,
            refund_amount: refundAmount,
            cancellation_charge: cancelBookingPrice,
            reason_for_cancel: surveyReason
        }
        console.log("🚀 ~ file: CancellationSurvey.tsx:77 ~ handleBookingCancellation ~ updateData:", updateData)

        // const { isUPdated } = await updateApiCollectionItem(BOOKINGS_COLLECTION, booking?.id!, updateData, token)

        // if (!isUPdated){
        //     //TODO: show alert
        //     return
        // }

        // const nextScreen = '/manage_bookings'
        // history.push(nextScreen)
    }


    return (
        <IonPage>
            <BackHeader backLink='/manage_booking_preview' title='Cancellation survey' />
            <IonContent className='ion-padding'>

                {/* Modal */}
                <IonModal
                    id="cancellation_modal"
                    ref={cancelationModal}
                    trigger="open-custom-dialog"
                    isOpen={showConfirmationModal}
                    onDidDismiss={() => setShowConfirmationModal(() => false)}
                >
                    <IonContent className='ion-padding'>
                        <div className="wrapper ">
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
                                        <IonText className='fw-bold-sm'>${cancelBookingPrice}</IonText>
                                    </SpaceBetween>
                                </div>

                                <div className='w-100 mt-4 border border-warning'></div>

                                <SpaceBetween className='mt-4'>
                                    <IonText className='text-muted'>Total</IonText>
                                    <div className="shadow-sm p-2 bg-light rounded-3 text-end" style={{ width: "180px", fontSize: '1.2rem' }}>
                                        <IonText>${cancelBookingPrice}</IonText>
                                    </div>
                                </SpaceBetween>

                            </section>

                            <SpaceBetween className='mt-3'>
                                <IonButton
                                    className='brown_fill_outline w-50 mx-2'
                                    shape='round'
                                    // onClick={dismiss}
                                    onClick={() => setShowConfirmationModal(false)}
                                >
                                    Close
                                </IonButton>
                                <IonButton
                                    className='brown_fill w-50 mx-2'
                                    shape='round'
                                    expand='block'
                                    onClick={() => {
                                        console.log('fine')
                                    }}
                                >
                                    Confirm
                                </IonButton>
                            </SpaceBetween>
                        </div>
                    </IonContent>
                </IonModal>



                {/* Cancellation Notice */}
                <section className="rounded-4 ion-padding text-danger" style={{ backgroundColor: "var(--light-red)" }}>
                    <p>Your booking won't be canaled until you answer this survey question.</p>
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
                                            <IonText className='w-100'>Made booking for the same dates - canceled the ones I don't need</IonText>
                                            <IonRadio slot="end" value={() => setSurveyReason(DUAL_BOOKING)} />
                                        </SpaceBetween>
                                    </IonCardContent>
                                </IonCard>
                            </IonItem>
                            <IonItem lines='none' className='ion-no-padding'>
                                <IonCard className="w-100" mode='ios'>
                                    <IonCardContent className=''>
                                        <SpaceBetween>
                                            <IonText className='w-75'>Found a different accommodation option</IonText>
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


                {/* Confirmation Moddal */}

                <div className='ion-text-center my-4'>
                    <IonButton
                        className='brown_fill'
                        shape='round'
                        size='large'
                        style={{ width: "12rem", height: "55px" }}
                        id={"open-custom-dialog"}
                        onClick={() => setShowConfirmationModal(() => true)}
                    >
                        Continue
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default CancellationSurvey


// values
const DATES_CHANGED = "dates_changed"
const DUAL_BOOKING = "dual_changed"
const CHOICE_CHANGED = "choice_changed"
const TRIP_CANCELLED = "trip_cancelled"
const CANCELATION_CHARGEE_PERCENTAGE = 0.1