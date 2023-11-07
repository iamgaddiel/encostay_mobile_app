import { IonContent, IonImg, IonPage, IonProgressBar, IonText, IonTitle } from '@ionic/react'

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import Plane from "../../assets/images/plane.svg"

//css
import "./PaymentProcessing.css"

import { createApiCollection, updateApiCollectionItem, updatePatchApiCollectionItem } from '../../helpers/apiHelpers'
import { BOOKINGS_COLLECTION, FLUTTERWAVE_COLLECTION, REVIEWS_COLLECTION } from '../../helpers/keys'

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { bookingAtom } from '../../atoms/bookingAtom'
import { userAtom } from '../../atoms/appAtom'
import { utilsAtom } from '../../atoms/utilityAtom'
import { flutterwaveTransactionIDAtom } from '../../atoms/transactionAtoms'
import { BookingItem } from '../../@types/bookings'



const PaymentProcessing = () => {
    const history = useHistory()

    const bookingDetail = useRecoilValue(bookingAtom)

    const setUtility = useSetRecoilState(utilsAtom)

    const { token: userToken } = useRecoilValue(userAtom)

    const [flutterwaveTransaction, setFlutterwaveTransaction] = useRecoilState(flutterwaveTransactionIDAtom)

    const { record: user, token: authToken } = useRecoilValue(userAtom)


    useEffect(() => {
        setUtility({ showTabs: false })
        processBooking()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            history.push("/payment_confirm")
        }, 10000)
    }, [])


    async function processBooking() {

        // Crate Booking
        const { isCreated, error, response } = await createApiCollection(BOOKINGS_COLLECTION, bookingDetail, userToken)
        const { apartment } = response as BookingItem

        if (!isCreated) {
            console.log(error)
            //TODO: show a toast message of the error
            return
        }

        createPendingUserReview(apartment) // Create user pending review

        if (user.preferred_currency === 'NGN') {

            const payload = {
                booking: response.id
            }

            await updatePatchApiCollectionItem(
                FLUTTERWAVE_COLLECTION,
                flutterwaveTransaction.collectionId,
                payload,
                authToken
            )

            // reset recoil state
            setFlutterwaveTransaction({ collectionId: '', transactionId: 0 })

            console.log("updated")
        }

    }

    async function createPendingUserReview(apartmentId: string) {
        const payload = {
            user: user.id,
            apartment: apartmentId,
        }
        const { isCreated, error, response } = await createApiCollection(REVIEWS_COLLECTION, payload, userToken)

        if (!isCreated) {
            console.log(error)
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