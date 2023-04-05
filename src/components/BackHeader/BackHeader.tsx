import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'

const BackHeader: React.FC<PropType> = ({ title }) => {
    return (
        <IonHeader className='ion-no-border'>
            <IonToolbar>
                <IonButtons slot='start'>
                    <IonBackButton />
                </IonButtons>

                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

type PropType = {
    title: string
}

export default BackHeader