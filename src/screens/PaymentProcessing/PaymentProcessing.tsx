import { IonContent, IonImg, IonPage, IonText, IonTitle } from '@ionic/react'
import React, { useEffect } from 'react'

import Plane from "../../assets/images/plane.svg"

//css
import "./PaymentProcessing.css"
import { useHistory } from 'react-router'

const PaymentProcessing = () => {
    const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            history.push("/payment_confirm")
        }, 4000)
    }, [])

    return (
        <IonPage>
            <IonContent fullscreen>
                <section className='d-flex justify-content-center align-items-center payment_wrapper'>
                    <div className="">
                        <div className="reciving_wapper ion-text-center">
                            <IonImg src={Plane} />
                        </div>

                        <div className="mt-4 ion-text-center">
                            <IonText className='fs-1'>Receiving</IonText>
                            <small className="text-muted block mt-2">the property's confimation</small>
                        </div>
                    </div>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default PaymentProcessing