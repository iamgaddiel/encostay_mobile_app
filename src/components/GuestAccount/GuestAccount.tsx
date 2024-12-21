import { IonPage, IonContent, IonAvatar, IonImg, IonButton, IonRouterLink, IonCard, IonIcon, IonCardContent, IonSkeletonText, IonChip, IonText, useIonViewDidEnter, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonTitle } from "@ionic/react";
import { heart, bedOutline, wifiOutline, chevronForwardOutline, chevronBack, chevronForward } from "ionicons/icons";
import Slider from "react-slick";
import { demoRoomsAtom } from "../../atoms/demoAtoms";
import SpaceBetween from "../style/SpaceBetween";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { utilsAtom } from "../../atoms/utilityAtom";
import { userAtom } from "../../atoms/appAtom";
import { useQuery } from "@tanstack/react-query";
import { listApartments } from "../../helpers/utils";
import { ApartementItem, Apartment, ApartmentSearchOptions } from "../../@types/apartments";
import HomeListCard from "../HomeListCard/HomeListCard";
import RoomLnd from "../../assets/images/room-ld.png";
import NotFound from "../NotFound";
import ProfileImage from "../ProfileImage";
import Loader from "../Loader";





const GuestsAccount = () => {
    // ----------------- Couresel Settings -----------------------
    const homeCategoryCarouselSettings = {
        className: "slider variable-width",
        // dots: true,
        infinite: false,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
    };

    const cardCarouselSettings = {
        dots: true,
        infinite: false,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        // dots: true,
        speed: 2000,
        rtl: false,
        autoplay: false,
        // autoplaySpeed: 2000,
        // cssEase: "linear",
    };

    const options = {
        items: 1,
        nav: true,
        rewind: true,
        autoplay: true,
        margin: 4
    }


    // ----------------- State -------------------------
    const { token: authToken, record: user } = useRecoilValue(userAtom);

    const rooms = useRecoilValue(demoRoomsAtom)

    const updateShowTabs = useSetRecoilState(utilsAtom)

    const [pageNumber, setPageNumber] = useState(1)

    const [apartmentType, setApartmentType] = useState<Apartment | ''>('')


    // ----------------- Queries -------------------------
    // const { data } = useQuery({
    //     queryKey: ['guestAccountFeaturedHome'],
    //     queryFn: featuredApartments
    // })

    const { data: apartmentList, isLoading, isError, error } = useQuery({
        queryKey: ['favoriteApartments', pageNumber, apartmentType],
        queryFn: () => fetchAllApartments(pageNumber, apartmentType)
    })

    useEffect(() => {
        updateShowTabs({ showTabs: true })
    }, [])




    // ----------------- functions -----------------------
    async function fetchAllApartments(page: number, type: Apartment | '') {
        try {
            let options: ApartmentSearchOptions = { perPage: 5, page }
            if (type !== '') options = { perPage: 5, page, filter: `type="${type}"` };
            return await listApartments(authToken, options);
        } catch (error: any) {
            throw new Error('error getting favorite apartments')
        }
    }

    //TODO: fetch featured apartments
    async function featuredApartments() { }

    //TODO: fetch users favorites apartmns
    async function favoriteApartments() { }





    if (isError) {
        return <NotFound heading="Error Getting Apartments" subheading={error as string} />
    }


    if (isLoading) {
        return (
            <Loader isOpen={isLoading} />
        )
    }



    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonGrid>
                        <IonRow className="ion-align-items-center">
                            <IonCol size="10">
                                <small className='text-muted fs-3 my-0 py-0'>Hey {user.name}!</small>
                                <small className="mt-1" style={{ display: "block" }}>Let's find your best residence!</small>
                            </IonCol>
                            <IonCol size="2">
                                <ProfileImage width={50} height={50} />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding page_wrapper'>
                {/* apartment category */}
                {/* TODO: use this as a search to display apartments based on apartment type */}
                <section className="apartment_types">
                    <Slider {...homeCategoryCarouselSettings}>
                        {/* TODO: add info (i) to each apartment type explaing what theya are */}
                        {/* <OwlCarousel options={options}> */}
                        <IonChip onClick={e => setApartmentType('')} outline color={'warning'} className='brown_fill'>All</IonChip>
                        <IonChip onClick={e => setApartmentType('co-op')} outline color={'warning'} className='brown_fill_outline'>Co-op</IonChip>
                        <IonChip onClick={e => setApartmentType('loft')} outline color={'warning'} className='brown_fill_outline'>Loft</IonChip>
                        <IonChip onClick={e => setApartmentType('condo')} outline color={'warning'} className='brown_fill_outline'>Condo</IonChip>
                        <IonChip onClick={e => setApartmentType('duplex')} outline color={'warning'} className='brown_fill_outline'>Duplex</IonChip>
                        <IonChip onClick={e => setApartmentType('garden')} outline color={'warning'} className='brown_fill_outline'>Garden</IonChip>
                        <IonChip onClick={e => setApartmentType('high-rise')} outline color={'warning'} className='brown_fill_outline'>High-rise</IonChip>
                        <IonChip onClick={e => setApartmentType('low-rise')} outline color={'warning'} className='brown_fill_outline'>Low-rise</IonChip>
                        <IonChip onClick={e => setApartmentType('micro')} outline color={'warning'} className='brown_fill_outline'>Micro</IonChip>
                        <IonChip onClick={e => setApartmentType('railroad')} outline color={'warning'} className='brown_fill_outline'>Railroad</IonChip>
                        <IonChip onClick={e => setApartmentType('single-family')} outline color={'warning'} className='brown_fill_outline'>Single Family</IonChip>
                        <IonChip onClick={e => setApartmentType('triplex')} outline color={'warning'} className='brown_fill_outline'>Triplex</IonChip>
                        <IonChip onClick={e => setApartmentType('walk-up')} outline color={'warning'} className='brown_fill_outline'>Walk up</IonChip>
                    </Slider>
                </section>




                {/* 
            -----------------------------------------------------------
            ------------------ [Apartment List] ------------------------
            -----------------------------------------------------------
             */}
                <section className=" mt-3">
                    <SpaceBetween className='my-1'>
                        <span> Trending Apartments</span>
                        {
                            apartmentList.items.length >= 1 && <IonRouterLink className="ion-warning">All</IonRouterLink>
                        }
                    </SpaceBetween>

                    <IonGrid className="mt-1">
                        <IonRow>
                            {apartmentList &&
                                apartmentList?.totalItems >= 1 ?
                                apartmentList.items.map((home: ApartementItem, index: number) =>
                                (
                                    <IonCol size="12" sizeXs="12" sizeSm="6" sizeLg="4" sizeXl="3" key={index}>
                                        <HomeListCard
                                            has_wifi={home.has_wifi}
                                            location={{
                                                country: home.country,
                                                state: home.state_location,
                                            }}
                                            imageUri={home?.image_1_thumbnail_url!}
                                            numberOfBedrooms={home.bedrooms}
                                            price={home.price}
                                            ratings={4}
                                            showRatings={true}
                                            title={home.title}
                                            homeId={home.id!}
                                            key={home?.id!}
                                        />
                                    </IonCol>
                                )
                                ) : <NotFound heading="No Apartments" subheading="There isn't any apartment listing" />
                            }
                        </IonRow>
                    </IonGrid>
                </section>


                {/* 
            -----------------------------------------------------------
            ------------------ [Pagination] ------------------------
            -----------------------------------------------------------
             */}
                {
                    /* Display current page and total number of paginated pages */
                    apartmentList.items.length >= 1 && (
                        <section className="my-4">
                            <div className="d-flex align-items-center justify-content-center">

                                {/* Back Button */}
                                <IonButton
                                    fill={'solid'}
                                    color={'warning'}
                                    disabled={apartmentList?.page === 1}
                                    onClick={() => setPageNumber((pgN) => pgN - 1)}
                                >
                                    <IonIcon icon={chevronBack} />
                                </IonButton>


                                {/* Forward Button */}
                                <IonButton
                                    fill={'solid'}
                                    color={'warning'}
                                    disabled={apartmentList?.page === apartmentList?.totalPages || apartmentList?.totalPages! < 1}
                                    onClick={() => setPageNumber((pgN) => pgN + 1)}
                                >
                                    <IonIcon icon={chevronForward} />
                                </IonButton>

                            </div>

                            <div className="text-center text-muted">
                                <IonText>page {apartmentList?.page} of {apartmentList?.totalPages}</IonText>
                            </div>
                        </section>
                    )
                }


                {/* 
            -----------------------------------------------------------
            ------------------ [Featured Places] ------------------------
            -----------------------------------------------------------
            */}

                {/* <section className="home_list_wrapper mt-4">
                    <SpaceBetween>
                        <span>Featured Places</span>
                        <IonRouterLink className="ion-warning">All</IonRouterLink>
                    </SpaceBetween>

                    <section className="home_list">
                        <Slider {...cardCarouselSettings}>
                            {
                                rooms.map((home, indx) => (
                                    <IonCard color={"light"} className='p-2 home_list_card p-3' key={indx}>
                                        <IonIcon icon={heart} className={`home_list_card_fav_icon text-${home.isFavourite ? "warning" : "light"}`} size='large' />
                                        <div className="home_list_item_img_wrapper" style={{ backgroundImage: `url(${home.img})` }}></div>

                                        <IonCardContent>
                                            <div className="home_list_card_hero_section">
                                                <div>
                                                    <big>{home.title}</big> <br />
                                                    <span className="text-muted">{home.location}</span>
                                                </div>
                                                <div>
                                                    <span className='text-muted'><big className='text-warning '>{home.price}</big>/ Day</span>
                                                </div>
                                            </div>

                                            <div className="home_list_card_info mt-3">
                                                <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                                                    <IonIcon icon={bedOutline} size='large' />
                                                    <span style={{ marginLeft: "7px" }}>{home.bedroom_nuber} Bedroom</span>
                                                </SpaceBetween>

                                                <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                                                    <IonIcon icon={wifiOutline} size='large' />
                                                    <span style={{ marginLeft: "7px" }}>{home.bedroom_nuber} Wifi</span>
                                                </SpaceBetween>

                                                <div className="bg-warning d-flex justify-content-center align-items-center p-1 rounded-1">
                                                    <IonIcon icon={chevronForwardOutline} />
                                                </div>
                                            </div>
                                        </IonCardContent>
                                    </IonCard>
                                ))
                            }

                        </Slider>
                    </section>
                </section> */}

                {/* 
            -----------------------------------------------------------
            ------------------ [Favorite Places] ------------------------
            -----------------------------------------------------------
             */}
                {/* <section className="home_list_wrapper mt-5">
                    <SpaceBetween className='my-3'>
                        <span>Favourite Places</span>
                        <IonRouterLink className="ion-warning">All</IonRouterLink>
                    </SpaceBetween>

                    <section className="home_list">
                        <Slider {...cardCarouselSettings}>
                            {
                                rooms.map((home, indx) => (
                                    <IonCard color={"light"} className='p-2 home_list_card p-3' key={indx}>
                                        <IonIcon icon={heart} className={`home_list_card_fav_icon text-${home.isFavourite ? "warning" : "light"}`} size='large' />
                                        <div className="home_list_item_img_wrapper" style={{ backgroundImage: `url(${home.img})` }}></div>

                                        <div className="home_list_card_hero_section">
                                            <div>
                                                <big>{home.title}</big> <br />
                                                <span className="text-muted">{home.location}</span>
                                            </div>
                                            <div>
                                                <span className='text-muted'><big className='text-warning '>{home.price}</big>/ Day</span>
                                            </div>
                                        </div>

                                        <div className="home_list_card_info mt-3">

                                            <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                                                <IonIcon icon={bedOutline} size='large' />
                                                <span style={{ marginLeft: "7px" }}>{home.bedroom_nuber} Bedroom</span>
                                            </SpaceBetween>

                                            <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                                                <IonIcon icon={wifiOutline} size='large' />
                                                <span style={{ marginLeft: "7px" }}>{home.bedroom_nuber} Wifi</span>
                                            </SpaceBetween>

                                            <div className="bg-warning d-flex justify-content-center align-items-center p-1 rounded-1">
                                                <IonIcon icon={chevronForwardOutline} />
                                            </div>
                                        </div>
                                    </IonCard>
                                ))
                            }

                        </Slider>
                    </section>
                </section> */}

            </IonContent>
        </IonPage >
    )
}

export default GuestsAccount