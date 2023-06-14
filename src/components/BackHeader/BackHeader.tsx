import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'


interface PropType{
    title: string
    backLink: string 
}

const BackHeader: React.FC<PropType> = ({ title, backLink }) => {
    return (
        <IonHeader className='ion-no-border'>
            <IonToolbar mode='ios'>
                <IonButtons slot='start'>
                    <IonBackButton defaultHref={backLink} />
                </IonButtons>

                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}



export default BackHeader