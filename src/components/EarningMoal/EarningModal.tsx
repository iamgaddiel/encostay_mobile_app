import { IonModal, IonText, IonButton, IonTitle, IonCard, IonCardContent, IonImg, IonRadio } from '@ionic/react';
import React, { useRef } from 'react'
import SpaceBetween from '../style/SpaceBetween';

import "./EarnModal.css"

// image
import Image from "../../assets/images/earn_modal_img.svg"
import MC from "../../assets/images/label.svg"




interface EarningModalProp {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const EarningModal: React.FC<EarningModalProp> = ({ isOpen, setIsOpen }) => {
    const cancelationModal = useRef<HTMLIonModalElement>(null);

    function dismiss() {
        cancelationModal.current?.dismiss();
    }

    return (
        <IonModal
            id="cancellation_modal"
            ref={cancelationModal}
            trigger="open-custom-dialog"
            isOpen={isOpen}
            onDidDismiss={() => setIsOpen(false)}
        >
            <div className="wrapper ion-padding">
                {/* image */}
                <section className="earn_modal_image_wraper" style={{ backgroundImage: `url(${Image})` }}></section>

                <section className="ion-text-center mt-4">
                    <div>
                        <p>You widthdrew</p>
                    </div>
                    <div className="p-2 rounded-4 w-50 mx-auto my-2" style={{ backgroundColor: "var(--light-orange" }}>
                        <IonText className=''> <big> ₦2323 </big></IonText>
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


export default EarningModal
