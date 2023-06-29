import { IonButton, IonCheckbox, IonContent, IonInput, IonItemDivider, IonLabel, IonPage, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react'
import React from 'react'
import BackHeader from '../../components/BackHeader/BackHeader'
import SpaceBetween from '../../components/style/SpaceBetween'

const AddApartments = () => {
    return (
        <IonPage>
            <BackHeader title='Add Apartment' backLink='/appartments' />
            <IonContent className='ion-padding' fullscreen>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <small>Tile</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" placeholder='Apartment title' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal' >
                    <small>Description</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonTextarea placeholder='Enter apartment description' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <small>Address</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" placeholder='123 John Street' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <small>City</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" placeholder='Free Town' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <small>State</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" placeholder='Lagos' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <small>Country</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" placeholder='Nigeria' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <small>Enter number of Guets</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" inputMode='numeric' placeholder='Guests' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <small>Enter number of Beds</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" inputMode='numeric' placeholder='Beds' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <small>Enter number of Bathrooms</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" inputMode='numeric' placeholder='4 Bathrooms' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <small>Appartment Type</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonSelect mode='ios' placeholder='Single Room' color={'warning'}>
                            <IonSelectOption>Loft</IonSelectOption>
                            <IonSelectOption>Micro Appartment</IonSelectOption>
                            <IonSelectOption>Duplex</IonSelectOption>
                            <IonSelectOption>Triplex</IonSelectOption>
                            <IonSelectOption>Co-up</IonSelectOption>
                            <IonSelectOption>Garden Apartment</IonSelectOption>
                            <IonSelectOption>Hight-Rise</IonSelectOption>
                            <IonSelectOption>Mid-Rise</IonSelectOption>
                            <IonSelectOption>Low-Rise</IonSelectOption>
                            <IonSelectOption>Railroad</IonSelectOption>
                            <IonSelectOption>Single Family</IonSelectOption>
                            <IonSelectOption>Condo</IonSelectOption>
                        </IonSelect>
                    </div>
                </div>

                {/* 
                -----------------------------------------------------------------
                ----------------------------- Available Items -------------------
                -----------------------------------------------------------------
                 */}
                <div className="mt-1 ion-padding">
                    <small className="text-muted">Select Items Available</small>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <small>Wifi</small>
                        <IonCheckbox mode='ios' color='warning' />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <small>TV Cable</small>
                        <IonCheckbox mode='ios' color='warning' />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <small>Security</small>
                        <IonCheckbox mode='ios' color='warning' />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <small>Gym</small>
                        <IonCheckbox mode='ios' color='warning' />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <small>Laundary</small>
                        <IonCheckbox mode='ios' color='warning' />
                    </SpaceBetween>
                </div>

                {/* 
                -----------------------------------------------------------------
                ----------------------------- Available Items -------------------
                -----------------------------------------------------------------
                 */}
                <div className="mt-2 ion-padding">
                    <small className="text-muted">Select Applied Rules</small>
                </div>
                <div className='mt-2 ion-padding-horizontal'>
                    <SpaceBetween>
                        <small>Smoking Allowed</small>
                        <IonCheckbox mode='ios' color='warning' />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <small>Pets Allowed</small>
                        <IonCheckbox mode='ios' color='warning' />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <small>Children Allowed</small>
                        <IonCheckbox mode='ios' color='warning' />
                    </SpaceBetween>
                </div>

                <div className='mt-4 ion-padding-horizontal'>
                    <small>State Additional Rules</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonTextarea placeholder='Lights out by 10:00pm' />
                    </div>
                </div>

                <div className='ion-padding-horizontal'>
                    <small>Number of Children allowed </small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" inputMode='numeric' placeholder='6 Children' />
                    </div>
                    <small className="text-muted">Enter max number of children allowed</small>
                </div>


                <IonButton
                    className="yellow_fill mt-5"
                    shape="round"
                    mode="ios"
                    size="large"
                    expand='block'
                >
                    Confirm
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default AddApartments