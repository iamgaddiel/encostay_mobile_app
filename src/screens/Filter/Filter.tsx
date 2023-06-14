import { IonAccordion, IonAccordionGroup, IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRange, IonText, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { showTabs } from '../../signals/settingsSignals'

// css
import "./Filter.css"
import { chevronBackCircleOutline } from 'ionicons/icons'

const Filter = () => {
    // todo: set min range state
    // todo: set max range state
    // todo: set average


    showTabs.value = false


    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar>
                    <IonButtons slot="start">
                        {/* todo:  */}
                        <IonBackButton mode='ios' defaultHref='/home'></IonBackButton>
                    </IonButtons>
                    <IonTitle className='ion-text-center'>Filters</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding' fullscreen>
                <form action="">

                    {/* ----------- [ Price Range] ----------------- */}
                    <section className="border rounded-4 p-4">
                        <IonText>Price range</IonText>

                        <div className="my-3">
                            <div>₦10 - $40</div>
                            <span className="text-muted">The average nightly price ₦76</span>
                        </div>

                        <IonRange
                            id='filter_prince_range'
                            color={"dark"}
                            mode='ios'
                            dualKnobs={true}
                            style={{ fontSize: "40px" }}
                            value={{
                                lower: 10,
                                upper: 100,
                            }}
                            onIonChange={(e) => e.detail.value}

                        />
                    </section>
                    {/* -------------------- [ CArd ] ------------------- */}
                    <section className='mt-3'>
                        <IonAccordionGroup multiple mode='ios'>
                            <IonAccordion value='accomodation_type' className='rounded-5'>
                                <IonItem slot="header" color="light" className='ion-padding' lines='none'>
                                    <IonLabel>Accomodation Type</IonLabel>
                                </IonItem>

                                <div className="ion-padding" slot="content">
                                    <IonList lines='none'>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_events">Apartment</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_pets">Loft</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_smoking">Condo</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_smoking">House</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_smoking">Studio</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_smoking">Duplex</IonCheckbox>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </IonAccordion>

                            <IonAccordion value='bedroom' className='rounded-5'>
                                <IonItem slot="header" color="light" className='ion-padding' lines='none'>
                                    <IonLabel>Bedroom</IonLabel>
                                </IonItem>

                                <div className="ion-padding" slot="content">
                                    <IonList lines='none'>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_events">Suitable for events</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_pets">Pets allowed</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_smoking">Smoking allowed</IonCheckbox>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </IonAccordion>

                            <IonAccordion value='amenities' className='rounded-5'>
                                <IonItem slot="header" color="light" className='ion-padding' lines='none'>
                                    <IonLabel>Amenities</IonLabel>
                                </IonItem>

                                <div className="ion-padding" slot="content">
                                    <IonList lines='none'>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_events">Suitable for events</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_pets">Pets allowed</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_smoking">Smoking allowed</IonCheckbox>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </IonAccordion>

                            <IonAccordion value='guests' className='rounded-5'>
                                <IonItem slot="header" color="light" className='ion-padding' lines='none'>
                                    <IonLabel>Guests</IonLabel>
                                </IonItem>

                                <div className="ion-padding" slot="content">
                                    <IonList lines='none'>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_events">Suitable for events</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_pets">Pets allowed</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_smoking">Smoking allowed</IonCheckbox>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </IonAccordion>

                            <IonAccordion value='unique_stays' className='rounded-5'>
                                <IonItem slot="header" color="light" className='ion-padding' lines='none'>
                                    <IonLabel>Unique stays</IonLabel>
                                </IonItem>

                                <div className="ion-padding" slot="content">
                                    <IonList lines='none'>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_events">Suitable for events</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_pets">Pets allowed</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_smoking">Smoking allowed</IonCheckbox>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </IonAccordion>

                            <IonAccordion value='house_rules' className='rounded-3'>
                                <IonItem slot="header" color="light" className='ion-padding' lines='none'>
                                    <IonLabel>House rules</IonLabel>
                                </IonItem>

                                <div className="ion-padding" slot="content">
                                    <IonList lines='none'>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_events">Suitable for events</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_pets">Pets allowed</IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox justify='space-between' name="for_smoking">Smoking allowed</IonCheckbox>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </IonAccordion>
                        </IonAccordionGroup>
                    </section>
                    <div className="ion-text-center my-5">
                        <IonButton className='brown_fill w-25' size='large' shape='round'>Apply</IonButton>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default Filter