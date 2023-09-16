import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { createApiCollection, getApiCollectionItem, updatePatchApiCollectionItem } from '../../helpers/apiHelpers';
import { BOOKINGS_COLLECTION, TRANSACTIONS_COLLECTION } from '../../helpers/keys';
import { userAtom } from '../../atoms/appAtom';
import { useRecoilValue } from 'recoil';
import { BookingItem } from '../../@types/bookings';
import { useQuery } from '@tanstack/react-query';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonToast, IonText, IonIcon, IonInput, IonButton, IonItem, IonList, IonLabel, IonListHeader, IonLoading } from '@ionic/react';
import { star, chevronForward, person, informationCircleOutline } from 'ionicons/icons';
import SpaceBetween from '../../components/style/SpaceBetween';
import { getHumanReadableDate } from '../../helpers/utils';

// image
import Image from "../../assets/images/room-pt.png"
import { Toast } from '../../@types/toast';
import { TransactionCreateFields } from '../../@types/transactions';






const HostAcceptOrDecline = () => {

    const { bookingId } = useParams<{ bookingId: string }>()

    const { token: authToken, record: user } = useRecoilValue(userAtom)

    const history = useHistory();

    const [showToast, setShowToast] = useState<Toast>({
        enabled: false,
        message: "",
        type: 'warning'
    });

    const [showLoading, setShowLoading] = useState({
        enabled: false,
        message: ''
    })


    const { data: booking, isLoading, isError, error } = useQuery({
        queryKey: ['hostBookingPreview'],
        queryFn: getBookingDetails
    })

    const [bookingStatus, setBookingStatus] = useState<'pending' | 'approved' | 'declined' > ('pending')

    const { day: checkInDay, monthAbbreviation: checkInMonth } = getHumanReadableDate(new Date(booking?.checkin_datetime!))
    const { day: checkOutDay, monthAbbreviation: checkOutMonth } = getHumanReadableDate(new Date(booking?.checkout_datetime!))



    useEffect(() => {
        function getBookingStatus(){
            // Pending
            if (booking?.is_pending && !booking?.is_approved ){
                setBookingStatus('pending')
            }

            // Approve
            if (!booking?.is_pending && booking?.is_approved ){
                setBookingStatus('approved')
            }

            // Declined
            if (!booking?.is_pending && !booking?.is_approved ){
                setBookingStatus('declined')
            }
        }
        getBookingStatus()
    }, [booking])




    // ==================================== Functions =================================


    async function getBookingDetails(): Promise<BookingItem | undefined> {
        try {
            const params = { expand: 'apartment,host,guest' }
            const { response, error } = await getApiCollectionItem(BOOKINGS_COLLECTION, bookingId, authToken, params) as { response: BookingItem, error: unknown }

            if (error) {
                setShowToast({
                    enabled: true,
                    message: 'Error: Unable to get booking detail',
                    type: 'danger'
                })
                console.error(error)
                return
            }

            return response

        } catch (error: any) {
            console.error(error)
        }
    }


    async function declineBooking() {
        //FIXME: remove loading when booking is declined

        setShowLoading({
            enabled: true,
            message: 'Declining...'
        })

        try {
            const data = {
                is_pending: false,
                is_approved: false,
            }

            updatePatchApiCollectionItem(BOOKINGS_COLLECTION, bookingId, data, authToken)

            const response = await getBookingDetails()

            if (!response?.is_pending) {
                setShowLoading({
                    enabled: false,
                    message: ''
                })
            }

        }
        catch (error: any) {
            setShowLoading({
                enabled: false,
                message: ''
            })

            setShowToast({
                enabled: true,
                message: 'Error: Unable to decline booking. Check your network connection and try again',
                type: 'danger'
            })
            return
        }

    }


    async function approveBooking() {
        //TODO; update host cash in wallet
        //FIXME: remove loading when booking is approved

        setShowLoading({
            enabled: true,
            message: 'Processing Approval...'
        })

        try {
            const data = {
                is_pending: false,
                is_approved: true,
            }

            updatePatchApiCollectionItem(BOOKINGS_COLLECTION, bookingId, data, authToken)

            createTransaction() // Create EArnings Transaction ---------------------

            setBookingStatus('approved')

        }
        catch (error: any) {
            setShowLoading({
                enabled: false,
                message: ''
            })

            setShowToast({
                enabled: true,
                message: 'Error: Unable to approve booking. Check your network connection and try again',
                type: 'danger'
            })
            return
        }

        setTimeout(() => {
            setShowLoading({
                enabled: false,
                message: ''
            })
        }, 5000)
    }


    async function createTransaction(): Promise< boolean| undefined > {
        const transactionData: TransactionCreateFields = {
            amount: booking?.price!,
            apartment: booking?.apartment!,
            is_in: true,
            host: user.id,
            booking: booking?.id!
        }

        const { isCreated } = await createApiCollection(TRANSACTIONS_COLLECTION, transactionData, authToken)

        if (!isCreated) {
            //FIXME: shows error when there's none
            setShowToast({
                enabled: true,
                message: 'Error: Unable create transactions',
                type: 'danger'
            })
            return
        }

        return isCreated
    }


    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/manage_bookings`} mode="ios" />
                    </IonButtons>
                    <IonTitle>Make Reservation</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {/* =========================== Loading Start ======================== */}
                <IonLoading isOpen={showLoading.enabled} message={showLoading.message} />
                {/* =========================== Loading ends ======================== */}

                {/* =========================== Toast Start ======================== */}
                <IonToast
                    isOpen={showToast.enabled}
                    color={showToast.type}
                    message={showToast.message}
                    duration={4000}
                    position="top"
                    onDidDismiss={() =>
                        setShowToast({
                            enabled: false,
                            message: ""
                        })
                    }
                />
                {/* =========================== Toast Ends ======================== */}

                {/* Home preview */}
                <section className="d-flex mt-3">
                    <div
                        className="preview_img rounded-4"
                        style={{ backgroundImage: `url(${Image})` }}
                    ></div>
                    <div
                        className="ml-5 align-between"
                        style={{ alignItems: "space-between" }}
                    >
                        <big>{booking?.expand?.apartment?.title}</big>
                        <IonText className="fs-3 block">
                            ₦{booking?.expand?.apartment?.price}/night
                        </IonText>
                        <span className="d-flex align-items-center">
                            <div className="fs-5">
                                <IonIcon icon={star} color="warning" /> 4.8
                            </div>
                            <div className="text-muted mx-4">(234)</div>
                        </span>
                    </div>
                </section>

                {/* Guest Details */}
                <section className="mt-3">
                    <IonList className='rounded-4'>
                        <IonListHeader>Guest Details</IonListHeader>
                        <IonItem style={{ background: 'transparent' }}>
                            <IonLabel>
                                <p>Name </p>
                                <IonText>{booking?.expand?.guest?.name!}</IonText>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <p>Phone </p>
                                <IonText>{booking?.guest_phone}</IonText>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <p>Extra Info </p>
                                <IonText>{booking?.aditional_info ? booking?.aditional_info : 'N/A'}</IonText>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <p>Apartment </p>
                                <IonText>{booking?.expand?.apartment?.title}</IonText>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <p>Status </p>
                                {/* Pending Booking Request */}
                                {bookingStatus === 'pending' ? <IonText color={'warning'}>Pending</IonText> : null}

                                {/* Approved Booking Request */}
                                {bookingStatus === 'approved' ? <IonText color={'success'}>Approved</IonText> : null}

                                {/* Declined Booking Request */}
                                {bookingStatus === 'declined' ? <IonText color={'danger'}>Declined</IonText> : null}
                                <IonText></IonText>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </section>

                {/* Checkin/checkout dates */}
                <section
                    className="my-4 d-flex justify-content-between p-4 rounded-4"
                    style={{ backgroundColor: "var(--white-4)" }}
                >
                    {/* CheckIn Section */}
                    <div
                        style={{ flex: 1 }}
                    >
                        <IonText className="text-muted">Check In</IonText>
                        <div
                            className="rounded-3 p-2 mt-4 shadow-sm"
                            style={{ width: "90px", backgroundColor: "white" }}
                        >
                            <SpaceBetween>
                                <IonText className="text-muted">
                                    {`${checkInMonth} ${checkInDay}`}
                                </IonText>
                                <IonIcon icon={chevronForward} />
                            </SpaceBetween>
                        </div>
                    </div>

                    {/* Checkout Section */}
                    <div
                        style={{ flex: 1 }}
                        className="mx-3"
                    >
                        <IonText className="text-muted">Checkout</IonText>
                        <div
                            className="rounded-3 p-2 mt-4 shadow-sm"
                            style={{ width: "90px", backgroundColor: "white" }}
                        >
                            <SpaceBetween>
                                <IonText className="text-muted">
                                    {`${checkOutMonth} ${checkOutDay}`}
                                </IonText>
                                <IonIcon icon={chevronForward} />
                            </SpaceBetween>
                        </div>
                    </div>

                    {/* Edit Number of Guests Staying*/}
                    <div style={{ flex: 2 }}>
                        <IonText className="text-muted">Guets</IonText>
                        <div className="rounded-3 p-2 mt-2 d-flex justify-content-between">
                            <div className="d-flex align-items-center justify-content-between mt-1">
                                <IonIcon icon={person} color={"warning"} />{" "}
                                <div>
                                    <small className="text-muted"></small>
                                    <IonInput
                                        type="text"
                                        inputMode="numeric"
                                        readonly
                                        value={booking?.number_of_guests}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Checkout Order Summary */}
                <section
                    className="rounded-4 p-4"
                    style={{ backgroundColor: "var(--light-red)" }}
                >
                    <IonText className="fw-bold text-muted">
                        Fee & Tax Details{" "}
                        <IonIcon
                            icon={informationCircleOutline}
                            color={"warning"}
                            className="mx-2"
                        />
                    </IonText>

                    <div className="mt-5">
                        <SpaceBetween className="my-3">
                            <IonText className="text-muted">
                                ${booking?.price} x {booking?.duration_of_stay} night
                            </IonText>
                            <IonText className="fw-bold-sm">${booking?.price! * booking?.duration_of_stay!}</IonText>
                        </SpaceBetween>
                        <SpaceBetween className="my-3">
                            <IonText className="text-muted">Services Charges</IonText>
                            <IonText className="fw-bold-sm">
                                ${booking?.transaction_charge}
                            </IonText>
                        </SpaceBetween>
                    </div>

                    <div className="w-100 mt-4 border border-warning"></div>

                    <SpaceBetween>
                        <div className="ion-text-start">
                            <IonText className="text-muted">Total</IonText>
                        </div>
                        <div
                            className="shadow-sm p-2 bg-light rounded-3 text-end w-75 mt-3"
                            style={{ fontSize: "1.2rem" }}
                        >
                            <IonText>${booking?.price}</IonText>
                        </div>
                    </SpaceBetween>
                </section>

                {/* Pending Bookking Request */}
                { bookingStatus === 'pending' ? (

                    <div className="ion-text-center mt-5 d-flex justify-content-evenly">
                        <IonButton
                            className=""
                            shape="round"
                            // size="default"
                            style={{ width: "12rem", height: "55px" }}
                            onClick={declineBooking}
                            color={'danger'}
                        >
                            Decline
                        </IonButton>

                        <IonButton
                            className="brown_fill"
                            shape="round"
                            // size="large"
                            style={{ width: "12rem", height: "55px" }}
                            onClick={approveBooking}
                        >
                            Approve
                        </IonButton>
                    </div>
                ) : null}

            </IonContent>
        </IonPage>
    );
}

export default HostAcceptOrDecline