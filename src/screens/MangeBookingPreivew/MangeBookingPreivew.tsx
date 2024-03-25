import { IonButton, IonContent, IonIcon, IonPage, IonText, IonTitle, useIonAlert, useIonLoading, useIonToast } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import BackHeader from '../../components/BackHeader/BackHeader'
import { star, person, ellipsisHorizontalCircleSharp, ellipsisHorizontal, chevronForward, warningOutline } from 'ionicons/icons'

import Image from "../../assets/images/room-pt.png"
import { useParams } from 'react-router'
import SpaceBetween from '../../components/style/SpaceBetween'
import { BookingItem } from '../../@types/bookings'
import { getBookingDetail, getDateDiffInDays, getHumanReadableDate } from '../../helpers/utils'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userAtom } from '../../atoms/appAtom'
import { appartmnetBookingAtom } from '../../atoms/bookingAtom'
import { getSaveData, saveData } from '../../helpers/storageSDKs'
import { APP_CONFIG, FLUTTERWAVE_COLLECTION, SELECTED_BOOKING_FOR_CANCELATION } from '../../helpers/keys'
import Currency from '../../components/Currency'
import { AppConfig } from '../../@types/appConfig'
import Settings from '../../helpers/settings'
import { _post } from '../../helpers/api'
import { listApiCollection } from '../../helpers/apiHelpers'
import { FlutterwaveTrsnaction } from '../../@types/flutterwave_transactions'





const MangeBookingPreivew = () => {
    const { bookingId } = useParams<{ bookingId: string }>()

    const { record: user } = useRecoilValue(userAtom)

    // recoil
    const { token } = useRecoilValue(userAtom)
    const setBookedApartment = useSetRecoilState(appartmnetBookingAtom)


    const { serverBaseUrl } = Settings()
    const [booking, setBooking] = useState<BookingItem>()


    const [checkInAndOutDateString, setInAndOutDateString] = useState({
        checkinString: '',
        checkoutString: ''
    })

    const [presentAlert, dismissAlert] = useIonAlert()
    const [presentToast, dismissToast] = useIonToast()
    const [presentLoading, dismissLoading] = useIonLoading()



    useEffect(() => {
        fetchBookingDetails()
    }, [])



    async function fetchBookingDetails(): Promise<void> {
        const bookingRes = await getBookingDetail(bookingId, token) as BookingItem

        saveData(SELECTED_BOOKING_FOR_CANCELATION, bookingRes) // store selected booking to DB

        const { day: checkInDay, monthAbbreviation: checkInMonth } = getHumanReadableDate(new Date(bookingRes.checkin_datetime))
        const { day: checkOutDay, monthAbbreviation: checkOutMonth } = getHumanReadableDate(new Date(bookingRes.checkout_datetime))

        setInAndOutDateString({
            checkinString: `${checkInMonth} ${checkInDay}`,
            checkoutString: `${checkOutMonth} ${checkOutDay}`,
        })

        setBooking(bookingRes)
    }


    async function cancelBookingRequest() {
        await presentLoading({
            message: 'Canceling reservation',
        })

        // get app service charge
        const { service_charge } = await getSaveData(APP_CONFIG) as AppConfig



        const bookingDuration = getDateDiffInDays(new Date(booking?.created!), new Date())
        let refundAmount = 0
        if (bookingDuration > 2) refundAmount = booking?.price! - (booking?.price! * service_charge); // if booking duration > 2days : deduct service charge for refund
        else refundAmount = booking?.price!; // else: refund fully  

        // Get flutterwave transactions
        const options = { filter: `booking='${booking?.id}'` }
        const { data } = await listApiCollection(FLUTTERWAVE_COLLECTION, token, options) as { data: FlutterwaveTrsnaction }

        if (data?.items.length < 1) {
            await dismissLoading()
            presentToast({
                header: 'Error Fetching Transaction',
                message: 'No transaction ID found for this booking',
                icon: warningOutline,
                position: 'top',
                color: 'danger',
                duration: 3000
            })
            return
        }

        // send refund request
        console.log("🚀 ~ cancelBookingRequest ~ data:", data)
        const flutterwaveTransaction = data?.items[0] // get transaction object for reservation
        const url = `${serverBaseUrl}/flw/refund`

        // use this for host withdrawal payload
        // const payload = {
        //     debit_currency: user?.preferred_currency,
        //     currency: user?.preferred_currency,
        //     transaction_id: flutterwaveTransaction?.transaction_id
        // }

        const payload = {
            amount: refundAmount,
            transaction_id: flutterwaveTransaction?.ref_id
        }
        const header = { 'Content-Type': 'application/json' }
        const { data: response } = await _post(url, payload, header)
        console.log("🚀 ~ cancelBookingRequest ~ response:", response)

        if (response?.status === 'error'){
            presentToast({
                message: response?.data,
                icon: warningOutline,
                position: 'top',
                color: 'danger',
                duration: 3000
            })
        }

        // delete booking
        // update app state 
        // go previous screen


        await dismissLoading()
    }


    return (
        <IonPage>
            <BackHeader title='Mange Booking' backLink='/manage_booking' />
            <IonContent fullscreen className='ion-padding'>
                <section className='d-flex mt-3'>
                    <div className="preview_img rounded-4" style={{ backgroundImage: `url(${booking?.expand?.apartment?.image_1_thumbnail_url})` }}></div>
                    <div className='ml-5 align-between' style={{ alignItems: "space-between" }}>
                        <big>{ }</big>
                        <IonText className='fs-3 block'><Currency currency={user.preferred_currency} />{booking?.expand?.apartment?.price}/night</IonText>
                        <span className='d-flex align-items-center justify-content-between'>

                            <div className='fs-5 d-flex'>
                                <IonIcon icon={star} color='warning' /> 4.8 {/* TODO: display correct rating */}
                                <span className="text-muted ml-2">
                                    <small>(234)</small> {/* TODO: display correct number of users who gave their rating */}
                                </span>
                            </div>

                            <div className="d-flex align-items-center">
                                <IonIcon icon={person} color='warning' className="mr-1" /> 1
                            </div>
                        </span>
                    </div>
                </section>

                <section className="mt-5 ion-padding rounded-4" style={{ backgroundColor: "var(--light-red)" }}>
                    <SpaceBetween>
                        <IonTitle>Details</IonTitle>
                        <IonIcon icon={ellipsisHorizontal} />
                    </SpaceBetween>

                    {/* Checkin/checkout dates */}
                    <div className='ion-padding-horizontal mt-2 py-3 '>
                        <IonText className='text-muted'>Check In</IonText>
                        <div className="d-flex align-items-center">
                            <div className='rounded-3 p-2 mt-2 shadow-sm' style={{ width: "90px", backgroundColor: "white" }}>
                                <SpaceBetween>
                                    <IonText className='text-muted'>{checkInAndOutDateString.checkinString}</IonText>
                                    <IonIcon icon={chevronForward} />
                                </SpaceBetween>
                            </div>
                            <IonText className="text-danger ml-3">
                                <small>from 01:00 PM until 12:00 PM</small>
                            </IonText>
                        </div>

                        <div className="border border-danger mt-3"></div>

                        <IonText className='text-muted  mt-3 block'>Checkout</IonText>
                        <div className="d-flex align-items-center">
                            <div className='rounded-3 p-2 mt-2 shadow-sm' style={{ width: "90px", backgroundColor: "white" }}>
                                <SpaceBetween>
                                    <IonText className='text-muted'>{checkInAndOutDateString.checkoutString}</IonText>
                                    <IonIcon icon={chevronForward} />
                                </SpaceBetween>
                            </div>
                            <IonText className="text-danger ml-3">
                                <small>until 12:00 PMM</small>
                            </IonText>
                        </div>

                    </div>
                </section>

                <SpaceBetween className='mt-4'>
                    <IonText className='text-muted'>Total price</IonText>
                    <div className="shadow-sm p-2 bg-light rounded-3 text-end" style={{ width: "200px", fontSize: '1.2rem' }}>
                        <IonText><Currency currency={user.preferred_currency} />{booking?.price}</IonText>
                    </div>
                </SpaceBetween>

                <div className='mt-3'>
                    <hr />
                    <IonText className='text-muted'>
                        <small>
                            The service fee is refundable if you cancel before
                            your reservation’s free cancellation period ends (2days after reservation is made)
                        </small>
                    </IonText>
                </div>


                <div className='ion-text-center' style={{ marginTop: "40px" }}>
                    <IonButton
                        className='brown_fill'
                        shape='round'
                        size='large'
                        style={{ width: "12rem", height: "55px" }}
                        onClick={() => presentAlert({
                            message: 'Are you sure you want to cancel your booking?',
                            header: 'Cancel Booking',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    cssClass: 'text-capitalize text-dark',
                                    handler: async () => await dismissAlert()
                                },
                                {
                                    text: 'Confirm',
                                    cssClass: 'text-capitalize text-warning',
                                    handler: () => cancelBookingRequest(),
                                }
                            ]
                        })}
                    // routerDirection='forward'
                    // routerLink='/booking_cancellation_survey/3'
                    >
                        Cancel Booking
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default MangeBookingPreivew