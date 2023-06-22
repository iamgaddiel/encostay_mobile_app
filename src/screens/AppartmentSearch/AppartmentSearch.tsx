import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonToolbar } from '@ionic/react'
import { optionsOutline } from 'ionicons/icons'
import React from 'react'
import SpaceBetween from '../../components/style/SpaceBetween'
import { rooms } from '../../atoms/demoSignals'
import HomeListCard from '../../components/HomeListCard/HomeListCard'

const AppartmentSearch = () => {
    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar className='ion-padding-vertical ion-padding-end pr-2 py-2'>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref='/home' />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className='ion-padding'>
                <IonSearchbar className='ion-no-border home_search_bar' mode='ios' />
                <section className="filter_section">
                    <SpaceBetween className='mt-2'>
                        <div className="d-flex justify-content-equally">
                            <IonButton className='yellow_fill'>Guests</IonButton>
                            <IonButton className='yellow' fill='outline'>Set date</IonButton>
                        </div>
                        <IonButton className="bg-dark" size='default' routerDirection='forward' routerLink='/filter'>
                            <IonIcon icon={optionsOutline} size='large' />
                        </IonButton>
                    </SpaceBetween>
                </section>

                <section className="appartment_counter mt-3">
                    <div className="my-3 text-muted">
                        <span>200+ places to stay</span>
                    </div>

                    <div className="mt-4">
                        {
                            rooms.value.map((home, indx) => (
                                <HomeListCard
                                    has_wifi={home.has_wifi}
                                    is_favourite={home.isFavourite}
                                    location={{ state: "Lagos", country: "Nigeria" }}
                                    imageUri={home.img}
                                    numberOfBedrooms={home.bedroom_nuber}
                                    price={home.price}
                                    ratings={4}
                                    showRattings={true}
                                    title="Gaddiel's home"
                                    key={indx}
                                />
                            ))
                        }
                    </div>

                </section>
            </IonContent>
        </IonPage>
    )
}

export default AppartmentSearch