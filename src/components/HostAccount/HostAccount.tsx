import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react'
import { bedOutline, briefcaseOutline, chatbubbleOutline, chevronForwardOutline, close, documentOutline, heart, menuOutline, notifications, notificationsOutline, pencil, person, personOutline, settingsOutline, wifiOutline } from 'ionicons/icons'
import React from 'react'
import SideMenu from '../SideMenu/SideMenu'
import SpaceBetween from '../style/SpaceBetween'
import Slider from 'react-slick'
import { rooms } from '../../atoms/demoSignals'

// images
import Pana from "../../assets/images/pana.svg"
import Card from "../../assets/images/view_ernings.svg"



interface Props {
    userImage: string
}


const HostAccount: React.FC<Props> = ({
    userImage
}) => {

    // ----------------- Couresel Settings -----------------------
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

    return (
        <>

            {/* Side Menu */}
            <SideMenu userImage={userImage} />


            {/* Man Page */}
            <IonPage id='main-content'>
                {/* Header */}
                <IonHeader className='ion-no-border'>
                    <IonToolbar className='p-2'>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>

                        <IonTitle>Welcome Back Olaitan!</IonTitle>
                        <IonAvatar slot="end" style={{ width: "45px", height: "45px"}}>
                            <IonImg src={userImage}/>
                        </IonAvatar>
                    </IonToolbar>
                </IonHeader>


                <IonContent className='ion-padding'>

                    {/*  */}
                    <section className="mb-4 py-2 border-bottom border-top d-flex align-items-center justify-content-between ">
                        <div className='w-75'>
                            <big className='fs-5'>Make Fortune <br /> Hosting Guest.</big>
                            <IonLabel className='block mt-3 text-muted' style={{ fontSize: "14px" }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, eius?
                            </IonLabel>
                        </div>
                        <IonImg src={Pana} className='w-75 ml-3' />
                    </section>


                    {/* View Earnings */}
                    <section
                        className="my-5 shadow rounded-4 view_earnings ion-padding"
                        style={{ backgroundImage: `url(${Card})` }}
                        onClick={() => alert("google")}
                    ></section>



                    {/* Add New Listing */}
                    <IonCard
                        className="yellow_fill my-5 mx-0"
                        mode="ios"
                        style={{ backgroundColor: "var(--white-4)" }}
                        routerDirection='forward'
                        routerLink='/add_card'

                    >
                        <IonCardContent className='p-3'>
                            <SpaceBetween>
                                <div className="rounded-4 d-flex align-items-center justify-content-center ion-padding" style={{ width: "100px", height: "80px", backgroundColor: "var(--text-color2)" }}>
                                    <IonIcon icon={pencil} size='large' color='warning' />
                                </div>

                                <div className='ml-4'>
                                    <strong>Add New Listing</strong>
                                    <small className='block mt-1 text-muted'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing
                                    </small>
                                </div>
                            </SpaceBetween>
                        </IonCardContent>
                    </IonCard>



                    {/* Most Rated Listing */}
                    <section className="home_list">
                        <section className="mt-4">{ }
                            <SpaceBetween>
                                <big>Most Rated Listing</big>
                                <IonButton shape='round' className='brown_fill_outline' fill='outline' size='small'>View all</IonButton>
                            </SpaceBetween>
                        </section>
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
                </IonContent>
            </IonPage>
        </>
    )
}

export default HostAccount