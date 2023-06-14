import { IonButton, IonCard, IonContent, IonIcon, IonLabel, IonModal, IonPage, IonSearchbar, IonText } from '@ionic/react'
import React, { useRef, useState } from 'react'
import BackHeaderWithAvater from '../../components/BackHeaderWithAvater/BackHeaderWithAvater'


// images
import Man from "../../assets/images/man.png"
import { arrowDown, arrowUp, filter } from 'ionicons/icons'
import SpaceBetween from '../../components/style/SpaceBetween'
import EarningModal from '../../components/EarningMoal/EarningModal'
import WithdrawModal from '../../components/WithdrawModal/WithdrawModal'


const Transactions = () => {
    // states
    const [earningModalIsOpen, setEarningModalIsOpen] = useState(false)
    const [withdrawModalIsOpen, setWithModalIsOpen] = useState(false)


    return (
        <IonPage>
            <BackHeaderWithAvater
                backHref='/home'
                title='Transactions'
                image={Man}
            />

            <IonContent fullscreen className='ion-padding'>


                {
                    earningModalIsOpen ? <EarningModal isOpen={earningModalIsOpen} setIsOpen={setEarningModalIsOpen} /> : null
                }
                {
                    withdrawModalIsOpen ? <WithdrawModal isOpen={withdrawModalIsOpen} setIsOpen={setWithModalIsOpen} /> : null
                }

                <section className="mt-3 d-flex align-items-center">
                    <IonSearchbar mode='ios' showCancelButton='focus' className='rounded-5 ion-no-border shadow-0' />
                    <IonButton
                        className='brown_fill'
                        style={{ width: "45px", height: "45px" }}
                        mode='ios'
                    >
                        <IonIcon icon={filter} size='large' />
                    </IonButton>
                </section>


                {/* tranactions */}
                <section className="mt-4">
                    <IonCard
                        className="rounded-4 p-3 my-3"
                        style={{ backgroundColor: "var(--primary)" }}
                        onClick={() => setEarningModalIsOpen(true)}
                    //todo: dynamically display link based on withdraw or earning
                    >
                        <big>
                            <IonLabel>Perfect Room, East...</IonLabel>
                        </big>
                        <SpaceBetween className='mt-2'>
                            <div>
                                <small className="text-muted">You earned <big className='fw-bold'>₦40,000</big></small>
                            </div>
                            <div>
                                <small className="text-warning">21:00 24 March <IonIcon icon={arrowUp} color={"success"} /> </small>
                            </div>
                        </SpaceBetween>
                    </IonCard>
                    <IonCard
                        className="rounded-4 p-3 my-3"
                        style={{ backgroundColor: "var(--primary)" }}
                        onClick={() => setWithModalIsOpen(true)}
                    //todo: dynamically display link based on withdraw or earning
                    >
                        <big>
                            <IonLabel>Perfect Room, East...</IonLabel>
                        </big>
                        <SpaceBetween className='mt-2'>
                            <div>
                                <small className="text-muted">You earned <big className='fw-bold'>₦40,000</big></small>
                            </div>
                            <div>
                                <small className="text-warning">21:00 24 March <IonIcon icon={arrowDown} color={"danger"} /> </small>
                            </div>
                        </SpaceBetween>
                    </IonCard>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default Transactions


