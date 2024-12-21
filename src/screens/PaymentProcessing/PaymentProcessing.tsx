import { IonContent, IonImg, IonPage, IonProgressBar, IonText, useIonRouter } from '@ionic/react'

import { useEffect } from 'react'

import Plane from "../../assets/images/plane.svg"

//css
import "./PaymentProcessing.css"

import { createApiCollection, updatePatchApiCollectionItem } from '../../helpers/apiHelpers'
import { BOOKINGS_COLLECTION, FLUTTERWAVE_COLLECTION, REVIEWS_COLLECTION } from '../../helpers/keys'

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { bookingAtom } from '../../atoms/bookingAtom'
import { userAtom } from '../../atoms/appAtom'
import { utilsAtom } from '../../atoms/utilityAtom'
import { flutterwaveTransactionIDAtom } from '../../atoms/transactionAtoms'
import { BookingItem } from '../../@types/bookings'



const PaymentProcessing = () => {
    const router = useIonRouter()

    const bookingDetail = useRecoilValue(bookingAtom)

    const setUtility = useSetRecoilState(utilsAtom)

    const { token: userToken } = useRecoilValue(userAtom)

    const [flutterwaveTransaction, setFlutterwaveTransaction] = useRecoilState(flutterwaveTransactionIDAtom)

    const { record: user, token: authToken } = useRecoilValue(userAtom)

    const setBookingDetail = useSetRecoilState(bookingAtom)




    useEffect(() => {
        processBooking()
        setUtility({ showTabs: false })
        setTimeout(() => {
            router.push("/payment_confirm")
        }, 10000)
    }, [])



    async function processBooking() {

        // Create Booking
        const { response, isCreated, error } = await createApiCollection(BOOKINGS_COLLECTION, bookingDetail, userToken)
        console.log("🚀 ~ processBooking ~ response:", response)
        const { expand, id: bookingId } = response as BookingItem

        if (!isCreated) {
            console.log(error, '<---- Errrrorrr')
            //TODO: show a toast message of the error
            return
        }

        createPendingUserReview(expand?.apartment?.id!) // Create pending review for to fill out later

        // updated flutterwave transactions with current booking details
        const flutteTransactionUpldatePayload = { booking: bookingId }
        await updatePatchApiCollectionItem(
            FLUTTERWAVE_COLLECTION,
            flutterwaveTransaction.collectionId,
            flutteTransactionUpldatePayload,
            authToken
        )
        setFlutterwaveTransaction({ collectionId: '', transactionId: 0 }) // reset flutterwave recoil state

        // reset booking atom state
        setBookingDetail({
            apartment: "",
            guest: "",
            checkin_datetime: "",
            aditional_info: "",
            is_paid: false,
            is_canceled: false,
            checkout_datetime: "",
            host: "",
            price: 0,
            number_of_guests: 0,
            transaction_charge: 0,
            duration_of_stay: 0,
            guest_phone: '',
            is_pending: true
        })
    }



    async function createPendingUserReview(apartmentId: string) {
        const payload = {
            user: user.id,
            apartment: apartmentId,
        }
        const { isCreated, error, response } = await createApiCollection(REVIEWS_COLLECTION, payload, userToken)

        if (!isCreated) {
            console.log(error, '<---- Review Collection not created')
            //TODO: show a toast message of the error
            return
        }

    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonProgressBar type='indeterminate' color={"warning"} />

                <section className='d-flex justify-content-center align-items-center payment_wrapper'>
                    <div className="">
                        <div className="reciving_wapper ion-text-center">
                            <IonImg src={Plane} />
                        </div>
                        <div className="ion-text-center">
                            <IonText className='fs-1'>Receiving</IonText>
                            <small className="text-muted block mt-2">the property's confirmation</small>
                        </div>

                        <div className="spinner- spinner-border-sm text-warning mt-4 ion-text-center" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default PaymentProcessing