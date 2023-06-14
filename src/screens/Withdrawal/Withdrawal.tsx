import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonLabel, IonPage } from '@ionic/react'
import React from 'react'
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle'
import SpaceBetween from '../../components/style/SpaceBetween'

//images
import CardImg from "../../assets/images/woman_card.svg"

const Withdrawal = () => {
    return (
        <IonPage>
            <HeaderTitle title='Withdrawl' />
            <IonContent className='ion-padding' fullscreen>
                <section className="my-3 rounded-3 p-3 shadow-sm">
                    <SpaceBetween>
                        <div>
                            <small>Available Balance</small>
                            <p className="fs-3">₦34,3434</p>
                        </div>
                        <IonImg src={CardImg} />
                    </SpaceBetween>
                </section>

                <section className="mt-5">
                    <IonInput
                        type="text"
                        inputMode='numeric'
                        placeholder='Enter amount to withdraw'
                        label='Amount'
                        labelPlacement='floating'
                        className='rounded-5 px-4'
                        style={{ background: "var(--primary-3)" }}
                    />
                    <IonInput
                        type="password"
                        placeholder='Enter password'
                        label='Password'
                        labelPlacement='floating'
                        className='rounded-5 px-4 mt-4'
                        style={{ background: "var(--primary-3)" }}
                    />

                    <div className="mt-5 ion-text-center">
                        <IonButton
                            className='yellow_fill w-75'
                            shape='round'
                            routerDirection='forward'
                            routerLink='/withdraw_receiving'
                            mode="ios"
                        >
                            Confrim Withdraw
                        </IonButton>
                    </div>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default Withdrawal