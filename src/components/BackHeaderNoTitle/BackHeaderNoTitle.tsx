import { IonBackButton, IonButtons, IonHeader, IonToolbar } from '@ionic/react'
import React from 'react'


interface Props{
    defaultHref: string
}

const BackHeaderNoTitle: React.FC<Props> = ({ defaultHref }) => {
  return (
    <IonHeader className='ion-no-border'>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton defaultHref={defaultHref} mode="ios" />
            </IonButtons>
        </IonToolbar>
    </IonHeader>
  )
}

export default BackHeaderNoTitle