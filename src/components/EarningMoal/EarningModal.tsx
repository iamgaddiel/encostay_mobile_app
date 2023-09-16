import { IonModal, IonText, IonButton, IonTitle, IonCard, IonCardContent, IonImg, IonRadio, IonIcon } from '@ionic/react';
import React, { useRef } from 'react'
import SpaceBetween from '../style/SpaceBetween';

import "./EarnModal.css"

// image

import HomeImage from "../../assets/images/room-ld.png"

import { EarningModalType } from '../../@types/transactions';
import { person, star } from 'ionicons/icons';




interface EarningModalProp {
    isOpen: boolean
    setModal: React.Dispatch<React.SetStateAction<EarningModalType>>
    modal: EarningModalType
}


const EarningModal: React.FC<EarningModalProp> = ({ isOpen, setModal, modal }) => {
    // TODO: current currency
    const cancelationModal = useRef<HTMLIonModalElement>(null);


    return (
        <IonModal
        id="cancellation_modal"
        ref={cancelationModal}
        trigger="open-custom-dialog"
        isOpen={isOpen}
        onDidDismiss={() => setModal({
            is_enabled: false,
            imageUrl: '',
            location: '',
            title: '',
            amount: '',
            numberOfGuests: 0,
            rating: '',
            apartmentPrice: 0
        })}
    >
        <div className="wrapper ion-padding home_list_card p-3">

            <div className="home_list_item_img_wrapper" style={{ backgroundImage: `url(${HomeImage})` }}></div>

            <div className="home_list_card_hero_section">
                <div>
                    <big>{modal.title}</big> <br />
                    <span className="text-muted">{modal.location}</span>
                </div>
            </div>
            <SpaceBetween>
                <span className='text-muted'><big className='text-warning '>${modal.apartmentPrice}</big>/ Day</span>
                <span className='d-flex align-items-center'><IonIcon icon={person} color='warning' /> {modal.numberOfGuests}</span>
                <span className='d-flex align-items-center'><IonIcon icon={star} color='warning' /> 4.8 <span className="text-muted">(3443)</span></span>
            </SpaceBetween>
            

            <div className="ion-text-center mt-4">
                <IonTitle> Earned ₦{modal.amount} </IonTitle>
            </div>
        </div>
    </IonModal>
    )
}


export default EarningModal
