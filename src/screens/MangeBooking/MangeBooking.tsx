import { IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import BackHeaderNoTitle from '../../components/BackHeaderNoTitle/BackHeaderNoTitle'

// css
import "./ManageBookings.css"

// image
import Image from "../../assets/images/room-pt.png"
import SpaceBetween from '../../components/style/SpaceBetween'
import { person, star } from 'ionicons/icons'

import "./ManageBookings.css"
import { useRecoilValue } from 'recoil'
import { userAtom } from '../../atoms/appAtom'
import { BookingList } from '../../@types/bookings'
import { getBookings } from '../../helpers/utils'
import NotFound from '../../components/NotFound/NotFound'


type View = "bookings" | "history"


const MangeBooking = () => {
    const [view, setView] = useState<View>("bookings")
    const [isCancelled, setIsCancelled] = useState(false)
    const bookingsDemo = [...new Array(2).keys()] //TODO: comment this


    const {record: user, token: authToken} = useRecoilValue(userAtom)
    const [isLoading, setIsLoading] = useState(false)
    const [bookings, setBookings] = useState<BookingList | null>(null)




    //TODO: use ReactQuery
    


    useEffect(() => {
        loadBookings()
    }, [])


    async function loadBookings() {
        const response = await getBookings(user.id, authToken)
        setBookings( () => response)
    }

    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar mode='ios'>
                    <IonTitle>Manage Booking</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">

                {/* Segment */}
                <IonSegment slot='' value={view} mode='ios' id='manage_bookings_segement w-75'>
                    <IonSegmentButton
                        className="text-capitalize"
                        title='bookings'
                        value='bookings'
                        onClick={() => setView("bookings")}
                    >
                        New Bookings
                    </IonSegmentButton>

                    <IonSegmentButton
                        className="text-capitalize"
                        title='history'
                        value='history'
                        onClick={() => setView("history")}
                    >
                        Booking History
                    </IonSegmentButton>
                </IonSegment>


                <section className="mt-1">
                    {
                        // view === "bookings" && bookings?.totalItems! >= 1 ? (
                        view === "bookings" && bookingsDemo.length >= 1 ? (
                            <IonList>
                                {
                                    // bookings && bookings.items.map((booking, indx) => (
                                    bookingsDemo && bookingsDemo.map((booking, indx) => (
                                        <IonItem key={indx} routerDirection='forward' routerLink='/manage_booking_preview'>
                                            <IonLabel>
                                                {/* Home preview */}
                                                <section className='d-flex mt-3'>
                                                    <div className="preview_img rounded-4" style={{ backgroundImage: `url(${Image})` }}></div>
                                                    <div className='ml-5 align-between' style={{ alignItems: "space-between" }}>
                                                        <IonLabel>Perfect Room and all sfsdf</IonLabel>
                                                        <IonText className='fs-5 block'>₦234/night</IonText>
                                                        <span className='d-flex align-items-center justify-content-between'>

                                                            <div className='d-flex'>
                                                                <IonIcon icon={star} color='warning' /> 4.8
                                                                <span className="text-muted ml-2">
                                                                    <small>(234)</small>
                                                                </span>
                                                            </div>

                                                            {
                                                                !isCancelled ? (
                                                                    <div className="d-flex align-items-center">
                                                                        <IonIcon icon={person} color='warning' className="mr-1" /> 1
                                                                    </div>
                                                                ) : (
                                                                    <div className='rounded-5 p-2' style={{ backgroundColor: "var(--light-red)" }}>
                                                                        <IonLabel className='text-danger'>Cancelled</IonLabel>
                                                                    </div>
                                                                )
                                                            }
                                                        </span>
                                                    </div>
                                                </section>
                                            </IonLabel>
                                        </IonItem>
                                    ))
                                }
                            </IonList>
                        ) : <NotFound message={"You don't have any booking yet... try booking an apartment"} />
                    }

                    {
                        view === "history" ? (
                            <div></div>
                        ) : null
                    }
                </section>
            </IonContent>
        </IonPage>
    )
}

export default MangeBooking