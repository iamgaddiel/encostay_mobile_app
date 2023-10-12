import { IonPage, IonContent, IonAvatar, IonImg, IonButton, IonRouterLink, IonCard, IonIcon, IonCardContent, IonSkeletonText, IonChip, IonText } from "@ionic/react";
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
import { ApartementItem } from "../../@types/apartments";
import HomeListCard from "../HomeListCard/HomeListCard";
import RoomLnd from "../../assets/images/room-ld.png";
import NotFound from "../NotFound";




interface Props {
    userImage: string
}

const GuestsAccount: React.FC<Props> = ({
    userImage
}) => {


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
    const [loading, setLoading] = useState(false)
    const updateShowTabs = useSetRecoilState(utilsAtom)
    const [pageNumber, setPageNumber] = useState(1)

    // const { data } = useQuery({
    //     queryKey: ['guestAccountFeaturedHome'],
    //     queryFn: featuredApartments
    // })

    const { data: apartmentList, isLoading, isError, error } = useQuery({
        queryKey: ['favoriteApartments', pageNumber],
        queryFn: () => fetchAllApartments(pageNumber)
    })

    useEffect(() => {
        updateShowTabs({ showTabs: true })
    }, [])




    // ----------------- functions -----------------------
    async function fetchAllApartments(page: number) {
        try {
            const options = {
                perPage: 5,
                page
            }
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
            <div className="ion-padding">
                <IonSkeletonText
                    animated
                    className="w-100 rounded-4"
                    style={{ height: "20px" }}
                />
                <IonSkeletonText
                    animated
                    className="w-100 my-3 rounded-3"
                    style={{ height: "200px" }}
                />
                <IonSkeletonText
                    animated
                    className="w-100 my-3 rounded-3"
                    style={{ height: "200px" }}
                />
                <IonSkeletonText
                    animated
                    className="w-100 my-3 rounded-3"
                    style={{ height: "200px" }}
                />
                <IonSkeletonText
                    animated
                    className="w-100 my-3 rounded-3"
                    style={{ height: "200px" }}
                />
            </div>
        )
    }



    return (
        <IonPage>
            <IonContent className='ion-padding page_wrapper'>
                <section className="hero mt-3">
                    <SpaceBetween>
                        <div>
                            <h4 className='text-muted'>Hey {user.name}!</h4>
                            <span className="mt-4" style={{ display: "block" }}>Let's find your best residence!</span>
                        </div>
                        <IonAvatar>
                            <IonImg src={userImage} />
                        </IonAvatar>
                    </SpaceBetween>
                </section>


                {/* apartment category */}
                {/* TODO: use this as a search to display apartments based on apartment type */}
                <section className="apartment_types mt-3">
                    <Slider {...homeCategoryCarouselSettings}>
                        {/* <OwlCarousel options={options}> */}
                        <IonChip outline color={'warning'} className='brown_fill'>All</IonChip>
                        <IonChip outline color={'warning'} className='brown_fill_outline'>Apartment</IonChip>
                        <IonChip outline color={'warning'} className='brown_fill_outline'>Loft</IonChip>
                        <IonChip outline color={'warning'} className='brown_fill_outline'>Condo</IonChip>
                        <IonChip outline color={'warning'} className='brown_fill_outline'>House</IonChip>
                        <IonChip outline color={'warning'} className='brown_fill_outline'>Studio</IonChip>
                        <IonChip outline color={'warning'} className='brown_fill_outline'>Duplex</IonChip>
                    </Slider>
                </section>
                {/* 
            -----------------------------------------------------------
            ------------------ [Featured Places] ------------------------
            -----------------------------------------------------------
            */}

                <section className="home_list_wrapper mt-4">
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
                </section>



                {/* 
            -----------------------------------------------------------
            ------------------ [Favorite Places] ------------------------
            -----------------------------------------------------------
             */}
                <section className="home_list_wrapper mt-5">
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
                </section>

                <section className=" mt-5 s">
                    <SpaceBetween className='my-3'>
                        <span> Trending Apartments</span>
                        <IonRouterLink className="ion-warning">All</IonRouterLink>
                    </SpaceBetween>

                    <div className="mt-4">
                        {apartmentList &&
                            apartmentList?.totalItems >= 1 &&
                            apartmentList.items.map((home: ApartementItem) =>
                            (
                                <HomeListCard
                                    has_wifi={home.has_wifi}
                                    location={{
                                        country: home.country,
                                        state: home.state_location,
                                    }}
                                    imageUri={RoomLnd}
                                    numberOfBedrooms={home.bedrooms}
                                    price={home.price}
                                    ratings={4}
                                    showRatings={true}
                                    title={home.title}
                                    homeId={home.id!}
                                    key={home?.id!}
                                />
                            )
                            )}
                    </div>
                </section>


                {/* 
            -----------------------------------------------------------
            ------------------ [Pagination] ------------------------
            -----------------------------------------------------------
             */}
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
                            disabled={apartmentList?.page === apartmentList?.totalPages}
                            onClick={() => setPageNumber((pgN) => pgN + 1)}
                        >
                            <IonIcon icon={chevronForward} />
                        </IonButton>

                    </div>
                    {/* Diisplay current page and total number of paginated pages */}
                    <div className="text-center text-muted">
                        {
                            apartmentList.items.length === 0 ? <IonText> page 0 of 0</IonText>
                            : <IonText>page {apartmentList?.page} of {apartmentList?.totalPages}</IonText>
                        }
                    </div>
                </section>
            </IonContent>
        </IonPage >
    )
}

export default GuestsAccount