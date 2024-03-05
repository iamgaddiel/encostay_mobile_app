import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../../atoms/appAtom'
import { serverLog } from '../../helpers/utils'
import { listApiCollection } from '../../helpers/apiHelpers'
import { REVIEWS_COLLECTION } from '../../helpers/keys'
import { ReviewList } from '../../@types/reviews'
import { star, person } from 'ionicons/icons'
import Currency from '../../components/Currency'
import NotFound from '../../components/NotFound'
import BackHeader from '../../components/BackHeader'
import Image from "../../assets/images/room-pt.png"

const GuestPendingReviews = () => {
    const { record: user, token: authToken } = useRecoilValue(userAtom)

    const { data: pendingReviews, isLoading } = useQuery({
        queryKey: ['guest_reviews', user],
        queryFn: () => getUserPendingReviews(user.id)
    })


    async function getUserPendingReviews(userId: string) {
        try {
            const payload = {
                filter: `user='${user.id}' && comment=''`,
                expand: `apartment`
            }
            const { data } = await listApiCollection(REVIEWS_COLLECTION, authToken, payload) as { data: ReviewList }
            return data
        }
        catch (error: any) {
            serverLog({
                errorMessage: 'Could not fetch user pending reviews',
                file: 'GuestPendingReviews',
                lineNumber: '21',
                user: user.id
            })
        }
    }


    return (
        <IonPage>
            <BackHeader backLink='/me' title='Pending Reviews' />
            <IonContent className='ion-padding'>
                <IonList>
                    {
                        pendingReviews?.items.length! >= 1 ? pendingReviews?.items.map((review, indx) => (
                            <IonItem key={indx} routerDirection='forward' routerLink={`/add_reviews/${review.expand?.apartment?.id}`}>
                                <IonLabel>
                                    <section className='d-flex mt-1'>
                                        <div className="preview_img rounded-4" style={{ backgroundImage: `url(${Image})` }}></div>
                                        <div className='ml-5 align-between' style={{ alignItems: "space-between" }}>
                                            <IonLabel>{review?.expand?.apartment?.title!}</IonLabel>
                                            <IonText className='fs-5 block'><Currency currency={user.preferred_currency} />{review.expand?.apartment?.price}/night</IonText>
                                            {/* TODO: calculate average rating */}
                                            {/* <span className='d-flex align-items-center justify-content-between'>

                                                <div className='d-flex'>
                                                    <IonIcon icon={star} color='warning' /> 4.8  <small className='ms-1'>(234)</small>
                                                </div>
                                            </span> */}
                                        </div>
                                    </section>
                                </IonLabel>
                            </IonItem>
                        )) : <NotFound heading='No Pending Reviews' subheading='Could not find any pending reviews left' />
                    }
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default GuestPendingReviews