import { IonPage, IonContent, IonAvatar, IonImg, IonButton, IonRouterLink, IonCard, IonIcon, IonCardContent } from "@ionic/react";
import { heart, bedOutline, wifiOutline, chevronForwardOutline } from "ionicons/icons";
import Slider from "react-slick";
import { rooms } from "../../signals/demoSignals";
import SpaceBetween from "../style/SpaceBetween";
import React from "react";



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



    
    // ----------------- functions -----------------------
    async function featuredApartments() { }


    async function favoriteApartments() { }


    return (
        <IonPage>
            <IonContent className='ion-padding page_wrapper'>
                <section className="hero mt-3">
                    <SpaceBetween>
                        <div>
                            <h4 className='text-muted'>Hey Gaddiel!</h4>
                            <span className="mt-4" style={{ display: "block" }}>Let's find your best residence!</span>
                        </div>
                        <IonAvatar>
                            <IonImg src={userImage} />
                        </IonAvatar>
                    </SpaceBetween>
                </section>


                {/* apartment category */}
                <section className="apartment_types mt-3">
                    <Slider {...homeCategoryCarouselSettings}>
                        {/* <OwlCarousel options={options}> */}
                        <IonButton className='brown_fill'>All</IonButton>
                        <IonButton className='brown_fill_outline'>Apartment</IonButton>
                        <IonButton className='brown_fill_outline'>Loft</IonButton>
                        <IonButton className='brown_fill_outline'>Condo</IonButton>
                        <IonButton className='brown_fill_outline'>House</IonButton>
                        <IonButton className='brown_fill_outline'>Studio</IonButton>
                        <IonButton className='brown_fill_outline'>Duplex</IonButton>
                        {/* </OwlCarousel> */}
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
                                rooms.value.map((home, indx) => (
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
                                rooms.value.map((home, indx) => (
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
            </IonContent>
        </IonPage >
    )
}

export default GuestsAccount