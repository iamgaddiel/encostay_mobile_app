import { IonLabel, IonRange, IonSelect, IonSelectOption, IonInput, useIonRouter, IonButton, IonIcon, IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React, { useState } from 'react'
import SpaceBetween from '../../components/style/SpaceBetween';
import { SET_NUMBER_OF_BEDS, SET_NUMBER_OF_ROOMS, SET_NUMBER_OF_BATHROOMS, SET_APARTMENT_TYPE, SET_PRICE_PER_NIGHT } from '../../reducers/actions/addApartmentsActions';
import { AddApartmentDetailType } from '../../@types/apartments';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { addApartmentAtom } from '../../atoms/apartmentAtom';
import { Prettify } from '../../@types/utils';
import { chevronForward } from 'ionicons/icons';
import AddApartmentFormPagination from '../../components/AddApartmentFormPagination';
import BackHeader from '../../components/BackHeader';





const AddApartmentDetails = () => {

    const router = useIonRouter()

    const [apartmentState, setAddApartmentState] = useRecoilState(addApartmentAtom)

    const { register, handleSubmit, formState: { errors }, control } = useForm<AddApartmentDetailType>({
        defaultValues: {
            bathrooms: 1,
            bedrooms: 1,
            beds: 1,
            price: 1500,
            type: 'duplex'
        }
    })

    const [state, setState] = useState<Prettify<Omit<AddApartmentDetailType, 'type' | 'price'>>>({
        beds: 1,
        bathrooms: 1,
        bedrooms: 1,
    })


    const handleFormSubmit: SubmitHandler<AddApartmentDetailType> = (data) => {
        console.log("🚀 ~ file: AddApartmentDetails.tsx:35 ~ AddApartmentDetails ~ data:", data)
        setAddApartmentState({ ...apartmentState, ...data })
        router.push('/add_apartment_items')
    }


    return (
        <IonPage>
            <BackHeader backLink='/add_apartment' title='Add Apartment Details' />
            <IonContent className='ion-padding'>
                <form onSubmit={handleSubmit(handleFormSubmit)}>

                    {/* 
    -----------------------------------------------------------------
    ----------------------------- Apartment Details -------------------
    -----------------------------------------------------------------
     */}
                    <div className="mt-1 ion-padding">
                        <small className="text-muted border-bottom block text-uppercase">
                            Apartment Details
                        </small>
                    </div>

                    {/* BEDS */}
                    <div className="mt-2 ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Number of Beds</small>
                            <IonLabel slot="end" className="">
                                {state.beds}
                            </IonLabel>
                        </SpaceBetween>
                        <div className="mt-2">
                            <Controller
                                name="beds"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Number of beds required'
                                    }, min: {
                                        value: 1,
                                        message: 'The min value of beds is 1'
                                    }, max: {
                                        value: 10,
                                        message: 'The max value of bed allowed is 10'
                                    }
                                }}
                                render={({ field: { ref} }) => <IonRange
                                    ref={ref}
                                    pin
                                    color={"warning"}
                                    pinFormatter={(value: number) => `${value}`}
                                    className="apartment__range"
                                    ticks
                                    snaps
                                    max={10}
                                    min={1}
                                    mode="ios"
                                    aria-required
                                    onChange={(e) => e.currentTarget.value}
                                    onIonChange={(e) => setState({...state, beds: +e.detail.value!})}
                                />}
                            />
                        </div>
                        {errors.beds && <small className='text-danger'>{errors.beds.message} </small>}
                    </div>

                    {/* BEDROOM */}
                    <div className="mt-2 ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Number of Bedrooms</small>
                            <IonLabel slot="end" className="">
                                {state.bedrooms}
                            </IonLabel>
                        </SpaceBetween>
                        <div className="mt-2">
                            <Controller
                                name="bedrooms"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Number of bedrooms required'
                                    }, min: {
                                        value: 1,
                                        message: 'The min value of bedrooms is 1'
                                    }, max: {
                                        value: 10,
                                        message: 'The max value of bedrooms allowed is 10'
                                    }
                                }}
                                render={({ field }) => <IonRange
                                    // {...field}
                                    pin
                                    color={"warning"}
                                    pinFormatter={(value: number) => `${value}`}
                                    className="apartment__range"
                                    ticks
                                    snaps
                                    max={10}
                                    min={1}
                                    mode="ios"
                                    aria-required
                                    onIonChange={(e) => setState({...state, bedrooms :+e.detail.value! })}
                                />}
                            />
                        </div>
                        {errors.bedrooms && <small className='text-danger'>{errors.bedrooms.message} </small>}
                    </div>

                    {/* BATHROOMS */}
                    <div className="mt-2 ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Number of Bathrooms</small>
                            <IonLabel slot="end" className="">
                                {state.bathrooms}
                            </IonLabel>
                        </SpaceBetween>
                        <div className="mt-2">
                            <Controller
                                name='bathrooms'
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'You need to specify bathrooms'
                                    },
                                    min: {
                                        value: 1,
                                        message: 'Minimum number of bathrooms is 1'
                                    },
                                    max: {
                                        value: 10,
                                        message: 'Maximum number of bathrooms is 10'
                                    }
                                }}
                                render={({ field }) => <IonRange
                                    // {...field}
                                    color={"warning"}
                                    pin
                                    pinFormatter={(value: number) => `${value}`}
                                    className="apartment__range"
                                    ticks
                                    snaps
                                    mode="ios"
                                    aria-required
                                    max={10}
                                    min={1}
                                    onIonChange={(e) => setState({...state, bathrooms: +e.detail.value!})}
                                />}
                            />
                        </div>
                        {errors.bathrooms && <small className='text-danger'>{errors.bathrooms.message} </small>}
                    </div>

                    {/* APARTMENT_TITLE */}
                    <div className="ion-margin-vertical ion-padding-horizontal">
                        <small>Apartment Type</small>
                        <div
                            className="rounded-5 mt-2"
                            style={{ backgroundColor: "var(--white-4)" }}
                        >
                            <IonSelect
                                mode="ios"
                                placeholder="Single Room"
                                color={"warning"}
                                {
                                ...register('type', {
                                    required: {
                                        value: true,
                                        message: 'Apartment title is required'
                                    }
                                })
                                }
                            >
                                <IonSelectOption value={"loft"}>Loft</IonSelectOption>
                                <IonSelectOption value={"micro apartment"}>
                                    Micro Apartment
                                </IonSelectOption>
                                <IonSelectOption value={"duplex"}>Duplex</IonSelectOption>
                                <IonSelectOption value={"triplex"}>Triplex</IonSelectOption>
                                <IonSelectOption value={"co-op"}>Co-up</IonSelectOption>
                                <IonSelectOption value={"garden apartment"}>
                                    Garden Apartment
                                </IonSelectOption>
                                <IonSelectOption value={"high-rise,"}>
                                    Hight-Rise
                                </IonSelectOption>
                                <IonSelectOption value={"mid-rise"}>Mid-Rise</IonSelectOption>
                                <IonSelectOption value={"low-rise"}>Low-Rise</IonSelectOption>
                                <IonSelectOption value={"railroad apartment"}>
                                    Railroad
                                </IonSelectOption>
                                <IonSelectOption value={"walk-up"}>Walk Up</IonSelectOption>
                                <IonSelectOption value={"single-family home"}>
                                    Single Family
                                </IonSelectOption>
                                <IonSelectOption value={"walk-up"}>
                                    Single Family
                                </IonSelectOption>
                                <IonSelectOption value={"condo"}>Condo</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>

                    {/* PRICE_PER_NIGHT */}
                    <div className="ion-margin-vertical ion-padding-horizontal">
                        <small>Price Per Night</small>
                        <div className="rounded-5 mt-2 px-3 grey__bg">
                            <IonInput
                                type="text"
                                inputMode="numeric"
                                placeholder="Price per night"
                                {
                                ...register('price', {
                                    required: {
                                        value: true,
                                        message: 'Price is required'
                                    }
                                })
                                }
                            />
                        </div>
                    </div>

                    <IonButton
                        className="yellow_fill my-5"
                        shape="round"
                        mode="ios"
                        size="large"
                        expand="block"
                        type="submit"
                    >
                        <AddApartmentFormPagination currentPage='2' maxPage='6' />
                        { }
                        Continue
                        <IonIcon icon={chevronForward} slot='end' />
                    </IonButton>

                </form>
            </IonContent>
        </IonPage>
    )
}

export default AddApartmentDetails