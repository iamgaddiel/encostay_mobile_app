import { IonModal, IonText, IonButton, IonCard, IonIcon, IonTitle } from '@ionic/react'
import React, { useRef } from 'react'
import SpaceBetween from '../style/SpaceBetween'
import { heart, home, bedOutline, wifiOutline, chevronForwardOutline, person, star } from 'ionicons/icons'


import HomeImage from "../../assets/images/room-ld.png"



interface WithdrawModalProp {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const WithdrawModal: React.FC<WithdrawModalProp> = ({ isOpen, setIsOpen }) => {
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
            <div className="wrapper ion-padding home_list_card p-3">

                <div className="home_list_item_img_wrapper" style={{ backgroundImage: `url(${HomeImage})` }}></div>

                <div className="home_list_card_hero_section">
                    <div>
                        <big>{"Rest Room"}</big> <br />
                        <span className="text-muted">{'location'}</span>
                    </div>
                </div>
                <SpaceBetween>
                    <span className='text-muted'><big className='text-warning '>${123}</big>/ Day</span>
                    <span className='d-flex align-items-center'><IonIcon icon={person} color='warning' /> 2</span>
                    <span className='d-flex align-items-center'><IonIcon icon={star} color='warning' /> 4.8 <span className="text-muted">(3443)</span></span>
                </SpaceBetween>
                

                <div className="ion-text-center mt-4">
                    <IonTitle> Eearned ₦232 </IonTitle>
                </div>
            </div>
        </IonModal>
    )
}
export default WithdrawModal