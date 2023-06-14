import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonAvatar, IonImg, IonBackButton } from '@ionic/react'
import React from 'react'


interface Props {
    title: string
    backHref: string
    image: string
}


const BackHeaderWithAvater: React.FC<Props> = ({ title, backHref, image }) => {
    return (
        <IonHeader className='ion-no-border'>
            <IonToolbar className='p-2'>
                <IonButtons slot="start">
                    <IonBackButton defaultHref={backHref} mode="ios" />
                </IonButtons>

                <IonTitle>{title}</IonTitle>
                <IonAvatar slot="end" style={{ width: "45px", height: "45px" }}>
                    <IonImg src={image} />
                </IonAvatar>
            </IonToolbar>
        </IonHeader>
    )
}

export default BackHeaderWithAvater