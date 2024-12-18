import { IonBackdrop, IonImg, IonLoading } from '@ionic/react'
import React from 'react'
import "./Loader.module.css"

import Images from '../../constants/Images'

const Loader: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    return (
        <IonLoading isOpen={isOpen} spinner={"circular"} color='warning' mode='ios' message={"please wait..."} />
    )
}

export default Loader