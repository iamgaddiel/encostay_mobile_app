import { IonContent, IonImg, IonPage, IonText, useIonRouter } from '@ionic/react'
import React, { useEffect } from 'react'

import "./WithdrawReceiving.css"
import CardImg from "../../assets/images/processing.svg"

const WithdrawReceiving = () => {
  const router = useIonRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push("/withdraw_confirm", "forward")
    }, 4000)
  }, [])
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <section className='d-flex justify-content-center align-items-center payment_wrapper'>
          <div className="">
            <div className="reciving_wapper ion-text-center">
              <IonImg src={CardImg} />
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

export default WithdrawReceiving