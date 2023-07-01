import { IonButton, IonCheckbox, IonContent, IonInput, IonItemDivider, IonLabel, IonPage, IonRadio, IonRadioGroup, IonRange, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react'
import React, { useReducer, useState } from 'react'
import BackHeader from '../../components/BackHeader/BackHeader'
import SpaceBetween from '../../components/style/SpaceBetween'


// css
import './AddApartments.css'




type MinMaxBounds = { lower: number, upper: number }

interface RangeValues {
    beds: number
    guests: number
    children: number
    minMaxNight: MinMaxBounds
    bathrooms: number
    bedrooms: number
    price: number
    pets: number
}

interface Action {
    payload: any
    type: string
}




const SET_NUMBER_OF_BEDS = "SET_NUMBER_OF_BEDS"
const SET_NUMBER_OF_GUESTS = "SET_NUMBER_OF_GUESTS"
const SET_NUMBER_OF_PETS = "SET_NUMBER_OF_PETS"
const SET_NUMBER_OF_CHILDREN = "SET_NUMBER_OF_CHILDREN"
const SET_NUMBER_OF_ROOMS = "SET_NUMBER_OF_ROOMS"
const SET_NUMBER_OF_BATHROOMS = "SET_NUMBER_OF_BATHROOMS"
const SET_MIN_MAx_NIGHTS = "SET_MIN_MAx_NIGHTS"



function reducer(state: RangeValues, { type, payload }: Action) {

    const tempState = { ...state }

    switch (type) {
        case SET_NUMBER_OF_BEDS:
            tempState.beds = payload
            break

        case SET_NUMBER_OF_GUESTS:
            tempState.guests = payload
            break

        case SET_NUMBER_OF_CHILDREN:
            tempState.children = payload
            break

        case SET_NUMBER_OF_PETS:
            tempState.pets = payload
            break

        case SET_NUMBER_OF_ROOMS:
            tempState.bedrooms = payload
            break

        case SET_NUMBER_OF_BATHROOMS:
            tempState.bathrooms = payload
            break

        case SET_MIN_MAx_NIGHTS:
            tempState.minMaxNight.lower = payload?.lower!
            tempState.minMaxNight.upper = payload?.upper!
            break

        default:
            return tempState
    }

    return tempState
}



const AddApartments = () => {
    //todo: if has_children == false && number_of_children > 0 : restrict form submition.
    //todo: 


    const [state, setState] = useReducer(reducer, {
        beds: 1,
        bathrooms: 1,
        bedrooms: 1,
        children: 1,
        guests: 1,
        minMaxNight: { lower: 1, upper: 30 },
        price: 0,
        pets: 0
    })


    return (
        <IonPage>
            <BackHeader title='Add Apartment' backLink='/appartments' />
            <IonContent className='ion-padding' fullscreen>
                {/* 
                -----------------------------------------------------------------
                ----------------------------- Apartment Location-------------------
                -----------------------------------------------------------------
                 */}
                <div className="mt-1 ion-padding">
                    <small className="text-muted border-bottom block text-uppercase">Apartmnet Location</small>
                </div>
                <div className='mt-2 ion-padding-horizontal'>
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

                {/* 
                -----------------------------------------------------------------
                ----------------------------- Apartment Details -------------------
                -----------------------------------------------------------------
                 */}
                <div className="mt-1 ion-padding">
                    <small className="text-muted border-bottom block text-uppercase">Apartment Details</small>
                </div>
                {/* 
                    <div className='mt-2 ion-padding-horizontal'>
                        <small>Apartment Imagess</small>
                        <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput type=""  placeholder='Images' />
                        </div>
                    </div> 
                */}
                <div className='mt-2 ion-padding-horizontal'>
                    <small>Number of Beds</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonRange
                            className='apartment__range'
                            color={'warning'}
                            pin
                            pinFormatter={(value: number) => `${value}`}
                            ticks
                            snaps
                            max={10}
                            min={1}
                            mode='ios'
                            onIonChange={
                                // (e) => setRangeValues({ ...rangeValues, beds: e.detail.value as number })
                                (e) => setState({
                                    type: SET_NUMBER_OF_BEDS,
                                    payload: e.detail.value
                                })
                            }
                        >
                            <IonLabel slot='end' className=''>{state.beds}</IonLabel>
                        </IonRange>
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <small>Nnumber of Bathrooms</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonRange
                            className='apartment__range'
                            color={'warning'}
                            pin
                            pinFormatter={(value: number) => `${value}`}
                            ticks
                            snaps
                            max={10}
                            min={1}
                            mode='ios'
                            onIonChange={(event) => setState({
                                type: SET_NUMBER_OF_BATHROOMS,
                                payload: event.detail.value
                            })}
                        >
                            <IonLabel slot='end'>{state.bathrooms}</IonLabel>
                        </IonRange>
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
                    <small className="text-muted border-bottom block text-uppercase">Select Items Available</small>
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
                ----------------------------- House Rules-------------------
                -----------------------------------------------------------------
                 */}
                <div className="mt-2 ion-padding">
                    <small className="text-muted text-uppercase border-bottom block">House Rules</small>
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
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <small>Number Of Guets Allowed</small>
                        <IonLabel slot='end'>{state.guests}</IonLabel>
                    </SpaceBetween>
                    <IonRange
                        className='apartment__range'
                        color={'warning'}
                        pin
                        pinFormatter={(value: number) => `${value}`}
                        ticks
                        snaps
                        max={10}
                        min={1}
                        mode='ios'
                        onIonChange={(event) => setState({
                            type: SET_NUMBER_OF_GUESTS,
                            payload: event.detail.value
                        })}
                    />
                </div>

                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <small>Number Of Children Allowed </small>
                        <IonLabel slot='end'>{state.children}</IonLabel>
                    </SpaceBetween>
                    <IonRange
                        className='apartment__range'
                        color={'warning'}
                        pin
                        pinFormatter={(value: number) => `${value}`}
                        ticks
                        snaps
                        max={10}
                        min={1}
                        mode='ios'
                        onIonChange={(event) => setState({
                            type: SET_NUMBER_OF_CHILDREN,
                            payload: event.detail.value
                        })}
                    />
                </div>

                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <SpaceBetween>
                        <small>Number Of Pets Allowed </small>
                        <IonLabel slot='end'>{state.pets}</IonLabel>
                    </SpaceBetween>

                    <IonRange
                        className='apartment__range'
                        color={'warning'}
                        pin
                        pinFormatter={(value: number) => `${value}`}
                        ticks
                        snaps
                        max={10}
                        min={1}
                        mode='ios'
                        onIonChange={(event) => setState({
                            type: SET_NUMBER_OF_PETS,
                            payload: event.detail.value
                        })}
                    />
                </div>

                {/* 
                -----------------------------------------------------------------
                ----------------------------- Time Rules  -------------------
                -----------------------------------------------------------------
                 */}
                <div className="mt-2 ion-padding">
                    <small className="text-muted ion-text-uppercase block border-bottom">Time schedule</small>
                </div>
                <div className='mt-2 ion-padding-horizontal'>
                    <small>Min / Max Nights Allowed</small>
                    <IonRange
                        className='apartment__range'
                        color={'warning'}
                        pin
                        pinFormatter={(value: number) => `${value}`}
                        ticks
                        snaps
                        max={30}
                        min={1}
                        mode='ios'
                        dualKnobs
                        // onIonChange={(e) => updateMinMaxNight(e.detail?.value as { lower: number, upper: number })}
                        onIonChange={(event) => setState({
                            type: SET_MIN_MAx_NIGHTS,
                            payload: event.detail.value
                        })}
                    >
                        <IonLabel slot='start'>{state.minMaxNight.lower}</IonLabel>
                        <IonLabel slot='end'>{state.minMaxNight.upper}</IonLabel>
                    </IonRange>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <small>Maximum number of nights allowed </small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" inputMode='numeric' placeholder='10 nights' />
                    </div>
                </div>
                <div className='ion-margin-vertical ion-padding-horizontal'>
                    <small>Maximum number of nights allowed </small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonInput type="text" inputMode='numeric' placeholder='10 nights' />
                    </div>
                </div>


                {/* 
                -----------------------------------------------------------------
                ----------------------------- Extras -------------------
                -----------------------------------------------------------------
                 */}
                <div className="mt-2 ion-padding">
                    <small className="text-muted ion-text-uppercase block border-bottom">Extras</small>
                </div>
                <div className='mt-2 ion-padding-horizontal'>
                    <small>State Additional Rules</small>
                    <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                        <IonTextarea placeholder='Lights out by 10:00pm' />
                    </div>
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
        </IonPage >
    )
}

export default AddApartments