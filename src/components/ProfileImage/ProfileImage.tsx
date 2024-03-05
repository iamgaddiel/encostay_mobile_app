import { IonAvatar, IonImg, IonThumbnail, useIonViewDidEnter } from '@ionic/react'
import { createAvatar } from '@dicebear/core'
import { identicon, thumbs } from '@dicebear/collection'

// images
import Man from "../../assets/images/man.png";
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../atoms/appAtom';
import { useState } from 'react';



// const avatarSvgString = avatar.toString()
type Props = {
    height?: number
    width?: number
    slot?: 'start' | 'end'
    className?: string
    name?: string
}
const ProfileImage: React.FC<Props> = ({ height, width, slot, className, name }) => {
    const { record: user } = useRecoilValue(userAtom)

    // create avatar
    const avatar = createAvatar(thumbs, { seed: name ?? user.name })

    const [image, setImage] = useState('')


    useIonViewDidEnter(() => {
        (async () => {
            const avatarSvgString = await avatar.toDataUri()
            setImage(avatarSvgString)
        })()
    }, [])

    if (slot) {
        return (
            <IonAvatar slot={slot} style={{ height: `${height}px`, width: `${width}px` }} className={`${className}`}>
                <IonImg src={image} alt={'profile image'} />
            </IonAvatar>
        )
    }

    return (
        <IonAvatar style={{ height: `${height}px`, width: `${width}px` }} className={`${className}`}>
            <IonImg src={image} alt={'profile image'} />
        </IonAvatar>
    )
}

export default ProfileImage
