import { IonButton, IonContent, IonIcon, IonPage, IonText, IonTitle } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import BackHeader from '../../components/BackHeader/BackHeader'
import { star, person, ellipsisHorizontalCircleSharp, ellipsisHorizontal, chevronForward } from 'ionicons/icons'

import Image from "../../assets/images/room-pt.png"
import { useParams } from 'react-router'
import SpaceBetween from '../../components/style/SpaceBetween'
import { BookingItem } from '../../@types/bookings'
import { getBookingDetail, getHumanReadableDate } from '../../helpers/utils'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userAtom } from '../../atoms/appAtom'
import { appartmnetBookingAtom } from '../../atoms/bookingAtom'
import { saveData } from '../../helpers/storageSDKs'
import { SELECTED_BOOKING_FOR_CANCELATION } from '../../helpers/keys'
import Currency from '../../components/Currency'


const MangeBookingPreivew = () => {
    const { bookingId } = useParams<{ bookingId: string }>()

    const {record: user} = useRecoilValue(userAtom)

    // recoil
    const { token } = useRecoilValue(userAtom)
    const setBookedApartment = useSetRecoilState(appartmnetBookingAtom)


    const [booking, setBooking] = useState<BookingItem>()


    const [checkInAndOutDateString, setInAndOutDateString] = useState({
        checkinString: '',
        checkoutString: ''
    })



    useEffect(() => {
        fetchBookingDetails()
    }, [])



    async function fetchBookingDetails(): Promise<void> {
        const bookingRes = await getBookingDetail(bookingId, token) as BookingItem
        
        saveData(SELECTED_BOOKING_FOR_CANCELATION, bookingRes) // store selected booking to DB

        const { day: checkInDay, monthAbbreviation: checkInMonth} = getHumanReadableDate(new Date(bookingRes.checkin_datetime))
        const { day: checkOutDay, monthAbbreviation: checkOutMonth} = getHumanReadableDate(new Date(bookingRes.checkout_datetime))

        setInAndOutDateString({
            checkinString: `${checkInMonth} ${checkInDay}`,
            checkoutString: `${checkOutMonth} ${checkOutDay}`,
        })

        setBooking(bookingRes)
    }


    return (
        <IonPage>
            <BackHeader title='Mange Booking' backLink='/manage_booking' />
            <IonContent fullscreen className='ion-padding'>
                <section className='d-flex mt-3'>
                    <div className="preview_img rounded-4" style={{ backgroundImage: `url(${Image})` }}></div>
                    <div className='ml-5 align-between' style={{ alignItems: "space-between" }}>
                        <big>{ }</big>
                        <IonText className='fs-3 block'><Currency currency={user.preferred_currency} />{booking?.expand?.apartment?.price}/night</IonText>
                        <span className='d-flex align-items-center justify-content-between'>

                            <div className='fs-5 d-flex'>
                                <IonIcon icon={star} color='warning' /> 4.8
                                <span className="text-muted ml-2">
                                    <small>(234)</small>
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


                <div className='ion-text-center' style={{ marginTop: "80px" }}>
                    <IonButton
                        className='brown_fill'
                        shape='round'
                        size='large'
                        style={{ width: "12rem", height: "55px" }}
                        routerDirection='forward'
                        routerLink='/booking_cancellation_survey/3'
                    >
                        Cancel Booking
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default MangeBookingPreivew