import { IonButton, IonCard, IonCardContent, IonContent, IonIcon, IonPage } from '@ionic/react'
import BackHeader from '../../components/BackHeader/BackHeader'
import { heart, bedOutline, wifiOutline, chevronForwardOutline } from 'ionicons/icons'
import { useRecoilValue } from 'recoil'
import { demoRoomsAtom } from '../../atoms/demoAtoms'
import SpaceBetween from '../../components/style/SpaceBetween'

const Appartments = () => {


    const rooms = useRecoilValue(demoRoomsAtom)


    return (
        <IonPage>
            <BackHeader backLink='/home' title='Apartment' />
            <IonContent className='ion-padding' fullscreen>
                <section className="home_list">
                    <section className="mt-4">{ }
                        <SpaceBetween>
                            <big>Most Rated Listing</big>
                            <IonButton
                                shape='round'
                                className='brown_fill_outline'
                                fill='clear'
                                size='small'
                                routerDirection='forward'
                                routerLink='/add_apartment'
                            >
                                Add
                            </IonButton>
                        </SpaceBetween>
                    </section>
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

                </section>
            </IonContent>
        </IonPage>
    )
}

export default Appartments