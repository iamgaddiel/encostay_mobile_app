import React, { useEffect } from 'react'
import CardImg from "../../assets/images/rafiki.svg"
import { IonPage, IonContent, IonImg, IonText, IonButton } from '@ionic/react'
import { useHistory } from 'react-router'


const WithdrawConfirm = () => {
    const history = useHistory()

    return (
        <IonPage>
            <IonContent fullscreen>
                <section className='d-flex justify-content-center align-items-center payment_wrapper'>
                    <div className="">
                        <div className="reciving_wapper ion-text-center">
                            <IonImg src={CardImg} />
                        </div>

                        <div className="mt-4 ion-text-center">
                            <IonText className='fs-1'>Confrimed</IonText>
                            <small className="w-75  mx-auto text-muted block mt-2">tyou'll get an emaill with your withdrawal confirmation</small>

                            <IonButton
                                className='mt-5 yellow_fill'
                                mode="ios"
                                shape='round'
                                routerLink='/transactions'
                                routerDirection='back'
                            >
                                View History
                            </IonButton>
                        </div>
                    </div>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default WithdrawConfirm