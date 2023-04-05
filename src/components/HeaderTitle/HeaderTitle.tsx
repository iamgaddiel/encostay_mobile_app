import { IonHeader, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'





const HeaderTitle: React.FC<PropType> = ({ title }) => {
    return (
        <IonHeader className='ion-no-border'>
            <IonToolbar>
                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

type PropType = {
    title: string
}


export default HeaderTitle