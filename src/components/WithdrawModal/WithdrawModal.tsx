import { IonModal, IonText, IonCard, IonCardContent, IonImg } from '@ionic/react'
import React, { useRef } from 'react'

import Image from "../../assets/images/earn_modal_img.svg"
import MC from "../../assets/images/label.svg"
import { WithdrawModalType } from '../../@types/transactions'



interface WithdrawModalProp {
    isOpen: boolean
    setModal: React.Dispatch<React.SetStateAction<WithdrawModalType>>
    modal: WithdrawModalType
}


const WithdrawModal: React.FC<WithdrawModalProp> = ({ isOpen, setModal, modal }) => {
    const cancelationModal = useRef<HTMLIonModalElement>(null);

    return (
        <IonModal
            id="cancellation_modal"
            ref={cancelationModal}
            trigger="open-custom-dialog"
            isOpen={isOpen}
            onDidDismiss={() => setModal({
                amountWithdrew: 0,
                is_enabled: false,
                price: 0,
                bank: {
                    account_name: '',
                    account_number: '',
                    bank_name: '',
                    bvn: ''
                }
            })}
        >
            <div className="wrapper ion-padding">
                {/* image */}
                <section className="earn_modal_image_wraper" style={{ backgroundImage: `url(${Image})` }}></section>

                <section className="ion-text-center mt-4">
                    <div>
                        <p>You withdraw</p>
                    </div>
                    <div className="p-2 rounded-4 w-50 mx-auto my-2" style={{ backgroundColor: "var(--light-orange" }}>
                        <IonText className=''> <big> ₦{123} </big></IonText>
                    </div>
                    <div className=''>
                        <p className='mt-2'>to</p>
                    </div>
                </section>
                <IonCard className="rounded-3 mt-2 ion-margin-vertical ion-padding-horizontal" style={{ backgroundColor: "var(--white-4)" }} mode='ios'>
                    <IonCardContent className='d-flex align-items-center px-1 py-4'>
                        <IonImg src={MC} />

                        <IonText className='ml-3'>
                            <small><span className="text-muted">Card Name: </span> John Keney Doe</small> <br />
                            <small>Card Number: <span className="text-muted">1255 1255 1255 1255</span></small> <br />
                            <small>Expiry Date: <span className="text-muted">12 / 2002</span></small>
                        </IonText>
                    </IonCardContent>
                </IonCard>
            </div>
        </IonModal>
    )
}
export default WithdrawModal