import { IonCard, IonCardContent, IonIcon } from '@ionic/react'
import { heart, home, bedOutline, wifiOutline, chevronForwardOutline, starOutline, star } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import SpaceBetween from '../style/SpaceBetween'
import "./HomeListCard.css"


type Location = {
    state: string
    country: string
}

interface Props {
    title: string
    location: Location
    price: string
    numberOfBedrooms: number
    has_wifi: boolean
    ratings: number
    is_favourite: boolean
    imageUri: string
    showRattings: boolean
}


const HomeListCard: React.FC<Props> = ({
    title,
    location,
    price,
    numberOfBedrooms,
    has_wifi,
    ratings,
    is_favourite,
    imageUri,
    showRattings
}) => {

    const [ratingsArray, setRattingsArray] = useState<number[]>([])



    // generate a dynamic array based on the number of ratings
    useEffect(() => {
        const arr = [...new Array(ratings).map((_, i) => ++i)]
        setRattingsArray(arr)
    }, [])


    return (
        <IonCard color={"light"} className='home_list_card' mode='ios' routerDirection='forward' routerLink='/apartment/123'>
            <IonIcon icon={heart} className={`home_list_card_fav_icon text-${is_favourite ? "warning" : "light"}`} size='large' />
            <div className="home_list_item_img_wrapper" style={{ backgroundImage: `url(${imageUri})` }}></div>

            <IonCardContent>

                <div className="home_list_card_hero_section">
                    <div>
                        <big>{title}</big> <br />
                        <span className="text-muted">{location.state}{location.country}</span>
                    </div>
                </div>

                <div className="home_list_card_info mt-3">

                    <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                        <IonIcon icon={bedOutline} size='large' />
                        <span style={{ marginLeft: "7px" }}>{numberOfBedrooms} Bedroom</span>
                    </SpaceBetween>

                    {
                        has_wifi ? (
                            <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                                <IonIcon icon={wifiOutline} size='large' />
                                <span style={{ marginLeft: "7px" }}>Wifi</span>
                            </SpaceBetween>
                        ) : null
                    }

                    <div className="bg-warning d-flex justify-content-center align-items-center p-2 rounded-1">
                        <IonIcon icon={chevronForwardOutline} />
                    </div>
                </div>

                {
                    showRattings ? (
                        <div className="mt-2 px-2">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className='text-muted'>
                                    <big className='text-warning fs-2'>{price}</big>/ Day
                                </div>

                                <div className='ion-text-center'>
                                    <span className="text-muted ion-margin-end">{ratings}.0</span>
                                    {
                                        ratingsArray.map(() => (
                                            <IonIcon icon={star} color="warning" />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </IonCardContent>
        </IonCard>
    )
}

export default HomeListCard