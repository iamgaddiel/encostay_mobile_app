import { IonBackButton, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTextarea, useIonRouter } from '@ionic/react'
import React from 'react'
import BackHeader from '../../components/BackHeader'
import { star, person, starOutline } from 'ionicons/icons'
import Currency from '../../components/Currency'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { serverLog } from '../../helpers/utils'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../../atoms/appAtom'
import { getApiCollectionItem } from '../../helpers/apiHelpers'
import { APARTMENTS_COLLECTION } from '../../helpers/keys'
import { ApartementItem } from '../../@types/apartments'



interface Prams {
    apartmentId: string
}
const GuestAddReview = () => {
    const { apartmentId } = useParams<Prams>()

    const router = useIonRouter()

    const { record: user, token: authToken } = useRecoilValue(userAtom)



    const { data: apartment} = useQuery({
        queryKey: ['add_review', apartmentId],
        queryFn: () => getApartment(apartmentId)
    })



    async function getApartment(apartment_id: string) {
        try {
            const { response } = await getApiCollectionItem(APARTMENTS_COLLECTION, apartment_id, authToken)
            return response as ApartementItem
        }
        catch (error: any) {
            const message = 'Could not fetch apartment details'
            serverLog({
                errorMessage: message,
                file: 'GuestAddReview.tsx',
                lineNumber: '37',
                user: user.id
            })
        }
    }



    return (
        <IonPage>
            <BackHeader backLink='/pending_reviews' title='Give Review' />
            <IonContent className='ion-padding'>
                {/* Apartment Preview */}
                {/* <section>
                    <IonItem>
                        <IonLabel>
                            <section className='d-flex mt-1'>
                                <div className="preview_img rounded-4" style={{ backgroundImage: `url(${Image})` }}></div>
                                <div className='ml-5 align-between' style={{ alignItems: "space-between" }}>
                                    <IonLabel>{apartment?.title!}</IonLabel>
                                    <IonText className='fs-5 block'><Currency currency={user.preferred_currency} />{apartment?.price}/night</IonText>
                                    <span className='d-flex align-items-center justify-content-between'>
                                        <div className='d-flex'>
                                            <IonIcon icon={star} color='warning' /> 4.8  <small className='ms-1'>(234)</small>
                                        </div>
                                    </span>
                                </div>
                            </section>
                        </IonLabel>
                    </IonItem>
                </section> */}

                <form action="">
                    {/* 5 Starts */}
                    <section>
                        <IonGrid>
                            <IonRow className='ion-justify-content-center'>
                                <IonCol size='1'>
                                    <IonIcon icon={starOutline} color='warning' />
                                </IonCol>
                                <IonCol size='1'>
                                    <IonIcon icon={starOutline} color='warning' />
                                </IonCol>
                                <IonCol size='1'>
                                    <IonIcon icon={starOutline} color='warning' />
                                </IonCol>
                                <IonCol size='1'>
                                    <IonIcon icon={starOutline} color='warning' />
                                </IonCol>
                                <IonCol size='1'>
                                    <IonIcon icon={starOutline} color='warning' />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </section>

                    <section>
                        <div
                            className="rounded-4 ion-margin-vertical p-2"
                            style={{ backgroundColor: "var(--white-4)" }}
                        >
                            <IonTextarea
                                placeholder='This apartment is...'
                                label='Comment'
                                labelPlacement='stacked'
                                autoGrow
                            />
                        </div>
                    </section>

                    <IonButton
                        className="yellow_fill mt-5"
                        shape="round"
                        mode="ios"
                        expand="block"
                        type="submit"
                    >
                        Apply
                    </IonButton>
                </form>
            </IonContent>
        </IonPage >
    )
}

export default GuestAddReview