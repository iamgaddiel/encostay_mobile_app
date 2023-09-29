import { IonContent, IonImg, IonPage, IonProgressBar, IonText, IonTitle } from '@ionic/react'

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import Plane from "../../assets/images/plane.svg"

//css
import "./PaymentProcessing.css"

import { createApiCollection } from '../../helpers/apiHelpers'
import { BOOKINGS_COLLECTION } from '../../helpers/keys'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { bookingAtom } from '../../atoms/bookingAtom'
import { userAtom } from '../../atoms/appAtom'
import { utilsAtom } from '../../atoms/utilityAtom'



const PaymentProcessing = () => {
    const history = useHistory()

    const bookingDetail = useRecoilValue(bookingAtom)

    const setUtility = useSetRecoilState(utilsAtom)

    const { token: userToken } = useRecoilValue(userAtom)


    useEffect(() => {
        setUtility({ showTabs: false })
        processBooking()
    }, [])

    useEffect(()=> {
        setTimeout(() => {
            history.push("/payment_confirm")
        }, 10000)
    }, [])


    async function processBooking() {

        const { isCreated, error } = await createApiCollection(BOOKINGS_COLLECTION, bookingDetail, userToken)

        if (!isCreated) {
            console.log(error)
            //TODO: show a toast message of the error
            return
        }

        console.log("render")
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
                    </div>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default PaymentProcessing