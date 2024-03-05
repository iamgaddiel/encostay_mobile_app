import { IonButton, IonCheckbox, IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
import React from 'react'
import SpaceBetween from '../../components/style/SpaceBetween'
import BackHeader from '../../components/BackHeader'
import { AddApartmentItemsType } from '../../@types/apartments'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { addApartmentAtom } from '../../atoms/apartmentAtom'
import { chevronForward } from 'ionicons/icons'
import AddApartmentFormPagination from '../../components/AddApartmentFormPagination'

const AddApartmentItems = () => {
    const router = useIonRouter()

    const setAddApartmentState = useSetRecoilState(addApartmentAtom)

    // const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<AddApartmentItemsType>()

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<AddApartmentItemsType>({
        defaultValues: {
            has_gym: false,
            has_laundry: false,
            has_security: false,
            has_tv_cable: false,
            has_wifi: false
        }
    })

    const handleFormSubmit: SubmitHandler<AddApartmentItemsType> = (data) => {
        console.log("🚀 ~ file: AddApartmentDetails.tsx:35 ~ AddApartmentDetails ~ data:", data)
        setAddApartmentState({ ...data })
        router.push('/add_apartment_rules')
    }

    return (
        <IonPage>
            <BackHeader backLink='/add_apartment_details' title='Add Apartment Items' />
            <IonContent className='ion-padding'>
                <form onSubmit={handleSubmit(handleFormSubmit)}>

                    {/* 
    -----------------------------------------------------------------
    ----------------------------- Available Items -------------------
    -----------------------------------------------------------------
     */}
                    <div className="mt-1 ion-padding">
                        <small className="text-muted border-bottom block text-uppercase">
                            Select Items Available
                        </small>
                    </div>

                    {/* WIFI */}
                    <div className="ion-margin-vertical ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Wifi</small>
                            <IonCheckbox
                                mode="ios"
                                color="warning"
                                {...register('has_wifi')}
                                onIonChange={e => setValue('has_wifi', e.detail.checked)}
                            />
                        </SpaceBetween>
                    </div>

                    {/* TV CABLE */}
                    <div className="ion-margin-vertical ion-padding-horizontal">
                        <SpaceBetween>
                            <small>TV Cable</small>
                            <IonCheckbox
                                mode="ios"
                                color="warning"
                                {...register('has_tv_cable')}
                                onIonChange={e => setValue('has_tv_cable', e.detail.checked)}
                            />
                        </SpaceBetween>
                    </div>

                    {/* SECURITY */}
                    <div className="ion-margin-vertical ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Security</small>
                            <IonCheckbox
                                mode="ios"
                                color="warning"
                                {...register('has_security')}
                                onIonChange={e => setValue('has_security', e.detail.checked)}

                            />
                        </SpaceBetween>
                    </div>

                    {/* GYM */}
                    <div className="ion-margin-vertical ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Gym</small>
                            <IonCheckbox
                                mode="ios"
                                color="warning"
                                {...register('has_gym')}
                                onIonChange={e => setValue('has_gym', e.detail.checked)}
                            />
                        </SpaceBetween>
                    </div>

                    {/* LAUNDRY */}
                    <div className="ion-margin-vertical ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Laundry</small>
                            <IonCheckbox
                                mode="ios"
                                color="warning"
                                {...register('has_laundry')}
                                onIonChange={e => setValue('has_laundry', e.detail.checked)}
                            />
                        </SpaceBetween>
                    </div>

                    <IonButton
                        className="yellow_fill my-5"
                        shape="round"
                        mode="ios"
                        size="large"
                        expand="block"
                        type="submit"
                    >
                        <AddApartmentFormPagination currentPage='3' maxPage='6' />
                        { }
                        Continue
                        <IonIcon icon={chevronForward} slot='end' />
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default AddApartmentItems