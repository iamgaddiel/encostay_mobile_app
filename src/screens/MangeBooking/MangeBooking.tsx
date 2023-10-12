import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonSkeletonText, IonText, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react'
import { useEffect, useState } from 'react'

// css
import "./ManageBookings.css"

// image
import Image from "../../assets/images/room-pt.png"
import SpaceBetween from '../../components/style/SpaceBetween'
import { person, star } from 'ionicons/icons'

import "./ManageBookings.css"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userAtom } from '../../atoms/appAtom'
import { BookingList } from '../../@types/bookings'
import { getBookings } from '../../helpers/utils'
import NotFound from '../../components/NotFound/NotFound'
import { utilsAtom } from '../../atoms/utilityAtom'
import { useQuery } from '@tanstack/react-query'


type View = "bookings" | "history"


const MangeBooking = () => {
    const [view, setView] = useState<View>("bookings")

    const { record: user, token: authToken } = useRecoilValue(userAtom)

    const hostId = user?.id!

    const setUtil = useSetRecoilState(utilsAtom)

    const [isCancelled, setIsCancelled] = useState(false) //TODO: comment this.

    const bookingsDemo = [...new Array(2).keys()] //TODO: comment this

    // const [isLoading, setIsLoading] = useState(false)

    // const [bookings, setBookings] = useState<BookingList | null>(null)

    const { data: bookings, isLoading, isError } = useQuery({
        queryKey: ['manageBookings'],
        queryFn: loadBookings
    })




    //TODO: use ReactQuery

    useEffect(() => {
        setUtil({ showTabs: true })
    }, [])




    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            // Any calls to load data go here
            loadBookings()
            event.detail.complete();
        }, 2000);
    }


    async function loadBookings(): Promise<BookingList> {
        try {
            let response: BookingList;

            if (user.account_type === 'guest') {
                response = await getBookings(user?.id!, authToken, 'guest')
            }
            else if (user.account_type === 'host') {
                response = await getBookings(user?.id!, authToken, 'host')
            }

            return response!
        }
        catch (e: any) {
            console.error(e)
            throw new Error(e)
        }
    }


    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar mode='ios'>
                    <IonTitle>Manage Booking</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">

                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

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

                {
                    isLoading ? (
                        <section>
                            <SpaceBetween>
                                <IonSkeletonText animated style={{ width: '50px', height: '50px', borderRadius: '20px' }} />
                                <div>
                                    <IonSkeletonText animated style={{ width: '100px', height: '20px' }} />
                                    <IonSkeletonText animated style={{ width: '85px', height: '20px' }} />
                                    <IonSkeletonText animated style={{ width: '70px', height: '20px' }} />
                                </div>
                            </SpaceBetween>
                        </section>
                    ) : (
                        <>
                            {
                                view === "bookings" ? (
                                    <>
                                        {
                                            bookings?.items.length! >= 1 ? (
                                                <section className="mt-1">
                                                    <IonList lines='none'>
                                                        {
                                                            bookings && bookings.items.slice(0, 5).map((booking, indx) => (
                                                                // bookingsDemo && bookingsDemo.map((booking, indx) => (
                                                                <IonItem key={indx} routerDirection='forward' routerLink={user.account_type === 'host' ? `/host/booking/preview/${booking.id}` : `/manage_booking_preview/${booking.id}`}>
                                                                    <IonLabel>
                                                                        <section className='d-flex mt-1'>
                                                                            <div className="preview_img rounded-4" style={{ backgroundImage: `url(${Image})` }}></div>
                                                                            <div className='ml-5 align-between' style={{ alignItems: "space-between" }}>
                                                                                <IonLabel>{booking?.expand?.apartment?.title!}</IonLabel>
                                                                                <IonText className='fs-5 block'>₦{booking.expand?.apartment?.price}/night</IonText>
                                                                                <span className='d-flex align-items-center justify-content-between'>

                                                                                    <div className='d-flex'>
                                                                                        <IonIcon icon={star} color='warning' /> 4.8  <small className='ms-1'>(234)</small>
                                                                                    </div>

                                                                                    {
                                                                                        !booking.is_canceled ? (
                                                                                            <div className="d-flex align-items-center">
                                                                                                <IonIcon icon={person} color='warning' className="mr-1" /> {booking.number_of_guests}
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
                                                </section>
                                            ) : <NotFound
                                                heading='No Bookings'
                                                subheading="...try booking an apartment"
                                            />
                                        }
                                    </>
                                ) : null
                            }
                        </>
                    )
                }


                {
                    view === "history" ? (
                        <>
                            {
                                bookings?.items.length! >= 1 ? (
                                    <section className="mt-1">
                                        <IonList lines='none'>
                                            {
                                                bookings && bookings.items.map((booking, indx) => (
                                                    // bookingsDemo && bookingsDemo.map((booking, indx) => (
                                                    <IonItem key={indx} routerDirection='forward' routerLink='/manage_booking_preview'>
                                                        <IonLabel>
                                                            <section className='d-flex mt-1'>
                                                                <div className="preview_img rounded-4" style={{ backgroundImage: `url(${Image})` }}></div>
                                                                <div className='ml-5 align-between' style={{ alignItems: "space-between" }}>
                                                                    <IonLabel>{booking?.expand?.apartment?.title!}</IonLabel>
                                                                    <IonText className='fs-5 block'>₦{booking.expand?.apartment?.price}/night</IonText>
                                                                    <span className='d-flex align-items-center justify-content-between'>

                                                                        <div className='d-flex'>
                                                                            <IonIcon icon={star} color='warning' /> 4.8  <small className='ms-1'>(234)</small>
                                                                        </div>

                                                                        {
                                                                            !booking.is_canceled ? (
                                                                                <div className="d-flex align-items-center">
                                                                                    <IonIcon icon={person} color='warning' className="mr-1" /> {booking.number_of_guests}
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
                                    </section>
                                ) : <NotFound
                                    heading='No History'
                                    subheading="...try booking an apartment"
                                />
                            }
                        </>
                    ) : null
                }
            </IonContent>
        </IonPage>
    )
}

export default MangeBooking