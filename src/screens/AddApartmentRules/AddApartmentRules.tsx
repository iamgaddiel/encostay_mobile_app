import { IonToggle, IonRange, IonPage, IonContent, useIonRouter, IonButton, IonIcon, IonText } from '@ionic/react'
import React, { useState } from 'react'
import SpaceBetween from '../../components/style/SpaceBetween'
import { SET_SMOKING_ALLOWED, SET_PETS_ALLOWED, SET_CHILDREN_ALLOWED, SET_PARTY_ALLOWED, SET_NUMBER_OF_GUESTS, SET_NUMBER_OF_CHILDREN, SET_NUMBER_OF_PETS } from '../../reducers/actions/addApartmentsActions'
import BackHeader from '../../components/BackHeader'
import { AddApartmentItemsType, AddApartmentRuleType } from '../../@types/apartments'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { addApartmentAtom } from '../../atoms/apartmentAtom'
import { Prettify } from '../../@types/utils'
import { chevronForward } from 'ionicons/icons'
import AddApartmentFormPagination from '../../components/AddApartmentFormPagination'



type Constraints = Omit<AddApartmentRuleType, 'smoking_allowed' | 'party_allowed'>


const AddApartmentRules = () => {
    // const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<AddApartmentRuleType>()

    const router = useIonRouter()

    const setAddApartmentState = useSetRecoilState(addApartmentAtom)


    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<AddApartmentRuleType>({
        defaultValues: {
            smoking_allowed: false,
            children_allowed: false,
            guests: 0,
            party_allowed: false,
            pets_allowed: false,
            max_number_of_children_allowed: 0,
            max_number_of_pets_allowed: 0
        }
    })

    const [constraints, setConstraints] = useState<Constraints>({
        guests: 0,
        max_number_of_children_allowed: 0,
        max_number_of_pets_allowed: 0,
        children_allowed: false,
        pets_allowed: false
    })

    const handleFormSubmit: SubmitHandler<AddApartmentRuleType> = (data) => {
        console.log("🚀 ~ file: AddApartmentRules.tsx:45 ~ AddApartmentRules ~ data:", data)
        setAddApartmentState({ ...data })
        router.push('/add_apartment_time_rules')
    }


    /* 
    -----------------------------------------------------------------
    ----------------------------- House Rules------------------------
    -----------------------------------------------------------------
     */
    return (
        <IonPage>
            <BackHeader backLink='/add_apartment_items' title='Add Apartment Rules' />
            <IonContent className='ion-padding'>
                <form onSubmit={handleSubmit(handleFormSubmit)}>


                    <div className="mt-2 ion-padding">
                        <small className="text-muted text-uppercase border-bottom block">
                            House Rules
                        </small>
                    </div>

                    {/* SMOKING ALLOWED */}
                    <div className="mt-2 ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Smoking Allowed</small>
                            <IonToggle
                                mode="ios"
                                color={"warning"}
                                {...register('smoking_allowed')}
                                onIonChange={(e) => setValue('smoking_allowed', e.detail.checked)}
                            />
                        </SpaceBetween>
                    </div>

                    {/* PETS ALLOWED */}
                    <div className="ion-margin-vertical ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Pets Allowed</small>
                            <IonToggle
                                mode="ios"
                                color={"warning"}
                                {...register('pets_allowed')}
                                onIonChange={(e) => {
                                    setValue('pets_allowed', e.detail.checked)
                                    if (!e.detail.checked) setValue('max_number_of_pets_allowed', 0)
                                    setConstraints({ ...constraints, pets_allowed: e.detail.checked })
                                }}
                            />
                        </SpaceBetween>
                    </div>

                    {/* CHILDREN ALLOWED */}
                    <div className="ion-margin-vertical ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Children Allowed</small>
                            <IonToggle
                                mode="ios"
                                color={"warning"}
                                {...register('children_allowed')}
                                onIonChange={(e) => {
                                    setValue('children_allowed', e.detail.checked)
                                    if (!e.detail.checked) setValue('max_number_of_children_allowed', 0)
                                    setConstraints({ ...constraints, children_allowed: e.detail.checked })
                                }}
                            />
                        </SpaceBetween>
                    </div>

                    {/* Party ALLOWED */}
                    <div className="ion-margin-vertical ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Party Allowed</small>
                            <IonToggle
                                mode="ios"
                                color={"warning"}
                                {...register('party_allowed')}
                                onIonChange={(e) => setValue('party_allowed', e.detail.checked)}
                            />
                        </SpaceBetween>
                    </div>

                    {/* GUEST ALLOWED */}
                    <div className="ion-margin-vertical ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Number Of Guest Allowed</small>
                            <IonText slot="end">{constraints.guests}</IonText>
                        </SpaceBetween>
                        <Controller
                            name='guests'
                            control={control}
                            rules={{
                                max: {
                                    value: 10,
                                    message: 'The maximum number of guest is 10'
                                }, min: {
                                    value: 0,
                                    message: 'The minimum number of guest allowed is 0'
                                }, required: {
                                    value: true,
                                    message: 'Specify the number of guest'
                                }
                            }}
                            render={({ field: { ref } }) => <IonRange
                                className="apartment__range"
                                color={"warning"}
                                pin
                                pinFormatter={(value: number) => `${value}`}
                                ticks
                                snaps
                                max={10}
                                min={0}
                                ref={ref}
                                mode="ios"
                                aria-label='Number of Guests Allowed'
                                onChange={(e) => e.currentTarget.value}
                                onIonChange={e => {
                                    setValue('guests', +e.detail.value)
                                    setConstraints({ ...constraints, guests: +e.detail.value })
                                }}
                            />}
                        />
                        {errors.guests && <small className='text-danger'>{errors.guests.message} </small>}
                    </div>


                    {/* NUMBER OF CHILDREN ALLOWED */}
                    {
                        constraints.children_allowed ? (
                            <div className="ion-margin-vertical ion-padding-horizontal">
                                <SpaceBetween>
                                    <small>Number Of Children Allowed </small>
                                    <IonText slot="end">{constraints.max_number_of_children_allowed}</IonText>
                                </SpaceBetween>
                                <Controller
                                    name='max_number_of_children_allowed'
                                    rules={{
                                        max: {
                                            value: 10,
                                            message: 'The maximum number of children allowed is 20'
                                        },
                                        min: {
                                            value: 1,
                                            message: 'The minimum number of children allowed is 0'
                                        },
                                        required: {
                                            value: true,
                                            message: 'Specify the number of children allowed'
                                        }
                                    }}
                                    control={control}
                                    render={({ field: { ref } }) => <IonRange
                                        className="apartment__range"
                                        aria-label='Number of Children Allowed'
                                        color={"warning"}
                                        pin
                                        pinFormatter={(value: number) => `${value}`}
                                        ticks
                                        snaps
                                        max={10}
                                        min={1}
                                        ref={ref}
                                        mode="ios"
                                        onIonChange={e => {
                                            setValue('max_number_of_children_allowed', +e.detail.value)
                                            setConstraints({ ...constraints, max_number_of_children_allowed: +e.detail.value })
                                        }}
                                        onChange={(e) => e.currentTarget.value}
                                    />}
                                />
                                {errors.max_number_of_children_allowed && <small className='text-danger'>{errors.max_number_of_children_allowed.message} </small>}
                            </div>
                        ) : null
                    }

                    {/* NUMBER OF PETS */}
                    {
                        constraints.pets_allowed ? (
                            <div className="ion-margin-vertical ion-padding-horizontal">
                                <SpaceBetween>
                                    <small>Number Of Pets Allowed </small>
                                    <IonText slot="end">{constraints.max_number_of_pets_allowed}</IonText>
                                </SpaceBetween>

                                <Controller
                                    name="max_number_of_pets_allowed"
                                    rules={{
                                        max: {
                                            value: 5,
                                            message: 'The maximum number of pets is 20'
                                        },
                                        min: {
                                            value: 1,
                                            message: 'The minimum number of pets allowed is 1'
                                        },
                                        required: {
                                            value: true,
                                            message: 'Specify the number of pets'
                                        }
                                    }}
                                    control={control}
                                    render={({ field: { ref } }) => <IonRange
                                        className="apartment__range"
                                        aria-label='Number of Pets Allowed'
                                        color={"warning"}
                                        pin
                                        pinFormatter={(value: number) => `${value}`}
                                        ticks
                                        snaps
                                        max={5}
                                        min={1}
                                        ref={ref}
                                        mode="ios"
                                        onIonChange={e => {
                                            setValue('max_number_of_pets_allowed', +e.detail.value)
                                            setConstraints({ ...constraints, max_number_of_pets_allowed: +e.detail.value })
                                        }}
                                    />}
                                />
                                {errors.max_number_of_pets_allowed && <small className='text-danger'>{errors.max_number_of_pets_allowed.message} </small>}
                            </div>
                        ) : null
                    }

                    <IonButton
                        className="yellow_fill my-5"
                        shape="round"
                        mode="ios"
                        size="large"
                        expand="block"
                        type="submit"
                    >
                        <AddApartmentFormPagination currentPage='4' maxPage='6' />
                        { }
                        Continue
                        <IonIcon icon={chevronForward} slot='end' />
                    </IonButton>
                </form>
            </IonContent>
        </IonPage >
    )
}

export default AddApartmentRules