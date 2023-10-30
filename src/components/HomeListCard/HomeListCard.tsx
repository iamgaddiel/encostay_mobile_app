import { IonCard, IonCardContent, IonIcon } from '@ionic/react'
import { heart, home, bedOutline, wifiOutline, chevronForwardOutline, starOutline, star } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import SpaceBetween from '../style/SpaceBetween'
import "./HomeListCard.css"
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { bookingAtom, selectedApartmentIdAtom } from '../../atoms/bookingAtom'
import { userAtom } from '../../atoms/appAtom'
import { useHistory } from 'react-router'
import Currency from '../Currency'


type Location = {
    state: string
    country: string
}

interface Props {
    title: string
    location: Location
    price: number
    numberOfBedrooms: number
    has_wifi: boolean
    ratings: number
    is_favorite?: boolean
    imageUri: string
    showRatings: boolean
    homeId: string
}


const HomeListCard: React.FC<Props> = ({
    title,
    location,
    price,
    numberOfBedrooms,
    has_wifi,
    ratings,
    is_favorite,
    imageUri,
    showRatings,
    homeId,
}) => {
    const history = useHistory()

    const [ratingsArray, setRatingsArray] = useState<number[]>([])

    const setSelectedApartmentId = useSetRecoilState(selectedApartmentIdAtom)

    const {record: user} = useRecoilValue(userAtom)

    // generate a dynamic array based on the number of ratings
    useEffect(() => {
        // const arr = [...new Array(ratings).map((_, i) => ++i)]
        const arr = [...new Array(ratings).keys()]
        setRatingsArray(arr)
    }, [])


    function viewApartment(apartmentId: string) {
        setSelectedApartmentId(apartmentId) // set for app level state
        history.push(`/apartment/${apartmentId}`)
    }


    return (
        <IonCard color={"light"} className='home_list_card' mode='ios' onClick={(() => viewApartment(homeId))}>
            <IonIcon icon={heart} className={`home_list_card_fav_icon text-${is_favorite ? "warning" : "light"}`} size='large' />
            <div className="home_list_item_img_wrapper" style={{ backgroundImage: `url(${imageUri})` }}></div >

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
                    showRatings ? (
                        <div className="mt-2 px-2">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className='text-muted'>
                                    <big className='text-warning fs-2'><Currency currency={user.preferred_currency} />{price}</big>/ Day
                                </div>

                                <div className='ion-text-center'>
                                    <span className="text-muted ion-margin-end">{ratings}.0</span>
                                    {
                                        ratingsArray.map((indx) => (
                                            <IonIcon icon={star} color="warning" key={indx} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </IonCardContent>
        </IonCard >
    )
}

export default HomeListCard