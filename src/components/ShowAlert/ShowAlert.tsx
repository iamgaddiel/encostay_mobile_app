import { IonAlert } from '@ionic/react'
import React from 'react'



const ShowAlert = ({ isOpen, setIsOpen, message, fallback }: PropType) => {
    return (
        <IonAlert
            isOpen={isOpen}
            onDidDismiss={() => setIsOpen(false)}
            message={message}
            buttons={[{
                text: 'Ok',
                handler: () => fallback!()
            }]}
            mode="ios"
        />
    )
}


type PropType = {
    isOpen: boolean
    message: string
    setIsOpen: (value: React.SetStateAction<boolean>) => void | void
    fallback?: () => void
}


export default ShowAlert