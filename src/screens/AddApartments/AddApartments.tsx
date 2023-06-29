import { IonButton, IonContent, IonInput, IonLabel, IonPage, IonRadio, IonRadioGroup, IonTextarea } from '@ionic/react'
import React from 'react'
import BackHeader from '../../components/BackHeader/BackHeader'
import SpaceBetween from '../../components/style/SpaceBetween'

const AddApartments = () => {
    return (
        <IonPage>
            <BackHeader title='Add Apartment' backLink='/appartments' />
            <IonContent className='ion-padding' fullscreen>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <IonLabel>Tile</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" placeholder='Apartment title' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal' >
                    <IonLabel>Description</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonTextarea placeholder='Enter apartment description' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <IonLabel>Address</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" placeholder='123 John Street' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <IonLabel>City</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" placeholder='Free Town' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <IonLabel>State</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" placeholder='Lagos' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <IonLabel>Country</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" placeholder='Nigeria' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <IonLabel>Enter number of Guets</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" inputMode='numeric' placeholder='Guests' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <IonLabel>Enter number of Beds</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" inputMode='numeric' placeholder='Beds' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <IonLabel>Enter number of Bathrooms</IonLabel>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" inputMode='numeric' placeholder='Bathrooms' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <IonLabel>Wifi Available</IonLabel>
                        <IonRadio />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <IonLabel>TV Cable Available</IonLabel>
                        <IonRadio />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <IonLabel>Security Available</IonLabel>
                        <IonRadio />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <IonLabel>Gym Available</IonLabel>
                        <IonRadio />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <IonLabel>Laundary Available</IonLabel>
                        <IonRadio />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <IonLabel>Smoking Allowed</IonLabel>
                        <IonRadio />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <IonLabel>Pets Allowed</IonLabel>
                        <IonRadio />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <IonLabel>Children Allowed</IonLabel>
                        <IonRadio />
                    </SpaceBetween>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <IonLabel>Gym Available</IonLabel>
                        <IonRadio />
                    </SpaceBetween>
                </div>

                <small className="block mt-1 text-muted ion-padding-horizontal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, cumque?
                </small>

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