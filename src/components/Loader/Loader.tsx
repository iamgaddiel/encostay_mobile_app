import { IonLoading } from '@ionic/react'
import React from 'react'

const Loader: React.FC<PropType> = ({ isLoading, message, setIsLoading, duration }) => {
    return (
        <IonLoading
            isOpen={isLoading}
            message={message}
            onDidDismiss={() => setIsLoading(false)}
            translucent
            mode='ios'
            duration={duration}
        />
    )
}

type PropType = {
    isLoading: boolean
    message: string
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    duration?: number
}

export default Loader