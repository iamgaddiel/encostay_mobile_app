import { IonSkeletonText, useIonViewDidEnter } from '@ionic/react'
import React, { useState } from 'react'


interface Props {
    height: number
    width: number
    count: number
}

/**
 * 
 * @param height - height is a number and the value for the css height is in pixels (px)
 * @param width - The width value is of vh (view port width)
 */
const SekeletonLoadingFullWidth: React.FC<Props> = ({ height, width, count }) => {
    const [skeletonCount, setSkeletonCount] = useState<number[]>([])

    useIonViewDidEnter(() => {
        setSkeletonCount([...Array(count).keys()])
    }, [])

    return (
        <>
            {
                skeletonCount.map((_, key) => (
                    <IonSkeletonText
                        animated
                        className="w-100 rounded-4"
                        style={{ height: `${height}px`, width: `${width}vw` }}
                        key={key}
                    />
                ))
            }
        </>
    )
}

export default SekeletonLoadingFullWidth