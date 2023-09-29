import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonIcon, IonSkeletonText } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { optionsOutline } from 'ionicons/icons';
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';
import { ApartementItem, ApartementList } from '../../@types/apartments';
import { userAtom } from '../../atoms/appAtom';
import HomeListCard from '../../components/HomeListCard/HomeListCard';
import SpaceBetween from '../../components/style/SpaceBetween';
import { listApartments } from '../../helpers/utils';
import RoomLnd from "../../assets/images/room-ld.png";




const Favorites = () => {
    const { token: authToken, record: user } = useRecoilValue(userAtom);

    const { data: apartmentList, isLoading } = useQuery({
        queryKey: ['favoriteApartments'],
        queryFn: fetchFavoriteApartments
    })

    async function fetchFavoriteApartments() {
        try {
            const options = { filter: `user="${user.id}"` }
            return await listApartments(authToken, options);
        } catch (error: any) {
            throw new Error('error getting favorite apartments')
        }
    }


    if (isLoading) {
        return (
            <>
                <IonSkeletonText
                    animated
                    className="w-100 rounded-4"
                    style={{ height: "20px" }}
                />
                <IonSkeletonText
                    animated
                    className="w-100 my-3 rounded-3"
                    style={{ height: "270px" }}
                />
                <IonSkeletonText
                    animated
                    className="w-100 my-3 rounded-3"
                    style={{ height: "270px" }}
                />
                <IonSkeletonText
                    animated
                    className="w-100 my-3 rounded-3"
                    style={{ height: "270px" }}
                />
                <IonSkeletonText
                    animated
                    className="w-100 my-3 rounded-3"
                    style={{ height: "270px" }}
                />
                <IonSkeletonText
                    animated
                    className="w-100 my-3 rounded-3"
                    style={{ height: "270px" }}
                />
            </>
        )
    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar className="ion-padding-end pr-2">
                    <IonTitle>Apartments</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <IonSearchbar className="ion-no-border home_search_bar" mode="ios" />
                <section className="filter_section">
                    <SpaceBetween className="mt-2">
                        <div className="d-flex justify-content-equally">
                            <IonButton className="yellow_fill">Guests</IonButton>
                            <IonButton className="yellow" fill="outline">
                                Set date
                            </IonButton>
                        </div>
                        <IonButton
                            className="bg-dark"
                            size="default"
                            routerDirection="forward"
                            routerLink="/filter"
                        >
                            <IonIcon icon={optionsOutline} size="large" />
                        </IonButton>
                    </SpaceBetween>
                </section>

                <section className="appartment_counter mt-3">
                    <div className="my-3 text-muted">
                        <span>{apartmentList?.totalItems}+ places to stay</span>
                    </div>

                    <div className="mt-4">
                        {apartmentList &&
                            apartmentList?.totalItems >= 1 &&
                            apartmentList.items.map((home: ApartementItem) =>
                            (
                                <HomeListCard
                                    has_wifi={home.has_wifi}
                                    // is_favourite={home.isFavourite}
                                    location={{
                                        country: home.country,
                                        state: home.state_location,
                                    }}
                                    imageUri={RoomLnd}
                                    numberOfBedrooms={home.bedrooms}
                                    price={home.price}
                                    ratings={4}
                                    showRattings={true}
                                    title={home.title}
                                    homeId={home.id!}
                                    key={home?.id!}
                                />
                            )
                            )}
ƒ                    </div>
                </section>
            </IonContent>
        </IonPage>
    );
}

export default Favorites