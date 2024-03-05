import { IonRange, IonLabel, IonDatetime, IonPage, IonContent, useIonRouter, useIonToast, IonButton, IonIcon } from '@ionic/react'
import { useState } from 'react'
import SpaceBetween from '../../components/style/SpaceBetween'
import BackHeader from '../../components/BackHeader'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { AddApartmentTimeRuleType } from '../../@types/apartments'
import { addApartmentAtom } from '../../atoms/apartmentAtom'
import { getTimeOrDateFromDateTimeString } from '../../helpers/utils'
import { chevronForward, warningOutline } from 'ionicons/icons'
import AddApartmentFormPagination from '../../components/AddApartmentFormPagination'



const AddApartmentTimeRules = () => {
    const router = useIonRouter()

    const [displayToast, _] = useIonToast()

    const setAddApartmentState = useSetRecoilState(addApartmentAtom)

    const { handleSubmit, formState: { errors }, control, setValue } = useForm<AddApartmentTimeRuleType>({
        defaultValues: {
            max_nights: 1,
            min_nights: 1
        }
    })

    const [state, setState] = useState<AddApartmentTimeRuleType>({
        min_nights: 1,
        max_nights: 1,
        checkin: '',
        checkout: ''
    })


    function handleToastDisplay(message: string) {
        displayToast({
            icon: warningOutline,
            message,
            duration: 4000,
            color: 'danger',
            position: 'top',
        })
        return
    }


    const handleFormSubmit: SubmitHandler<AddApartmentTimeRuleType> = (data) => {
        const { max_nights, min_nights } = data
        console.log("🚀 ~ file: AddApartmentTimeRules.tsx:44 ~ AddApartmentTimeRules ~ data:", data)

        if (max_nights === min_nights){
            displayToast({
                icon: warningOutline,
                message: "min and max nights can't be the same",
                duration: 4000,
                color: 'danger',
                position: 'top',
            })
            return
        }

        if (data.min_nights > data.max_nights) {
            displayToast({
                icon: warningOutline,
                message: "min and max nights can't be the same",
                duration: 4000,
                color: 'danger',
                position: 'top',
            })
            return
        }

        setAddApartmentState({ ...data })
        router.push('/add_apartment_images')
    }
    /* 
-----------------------------------------------------------------
----------------------------- Time Rules  -----------------------
-----------------------------------------------------------------
*/
    return (
        <IonPage>
            <BackHeader backLink='/add_apartment_rules' title='Apartment Time Rules' />
            <IonContent className='ion-padding'>
                <form onSubmit={handleSubmit(handleFormSubmit)}>

                    <div className="mt-2 ion-padding">
                        <small className="text-muted ion-text-uppercase block border-bottom">
                            Time schedule
                        </small>
                    </div>

                    {/* MIN_NIGHTS */}
                    <div className="mt-2 ion-padding-horizontal">
                        <small>Minimum Nights Allowed</small>
                        <Controller
                            name='min_nights'
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Min night is required'
                                }
                            }}
                            render={({ field: { ref } }) => <IonRange
                                ref={ref}
                                className="apartment__range"
                                color={"warning"}
                                pin
                                pinFormatter={(value: number) => `${value}`}
                                ticks
                                snaps
                                max={30}
                                min={1}
                                mode="ios"
                                id={"minMaxNight"}
                                onIonChange={(e) => {
                                    setValue('min_nights', +e.detail.value)
                                    setState({ ...state, min_nights: +e.detail.value })
                                }}
                            >
                                <IonLabel slot="start">{state.min_nights}</IonLabel>
                            </IonRange>}
                        />
                        {errors.min_nights && <small className='text-danger'>{errors.min_nights.message}</small>}
                    </div>

                    {/* MAX_NIGHTS */}
                    <div className="mt-2 ion-padding-horizontal">
                        <small>Maximum Nights Allowed</small>
                        <Controller
                            name='min_nights'
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Min night is required'
                                }, min: {
                                    value: 1,
                                    message: 'The minimum number of nights is 1'
                                }, max: {
                                    value: 30,
                                    message: 'The maximum number of nights is 30'
                                }
                            }}
                            render={({ field: { ref } }) => (
                                <IonRange
                                    ref={ref}
                                    className="apartment__range"
                                    color={"warning"}
                                    pin
                                    pinFormatter={(value: number) => `${value}`}
                                    ticks
                                    snaps
                                    max={30}
                                    min={1}
                                    mode="ios"
                                    id={"minMaxNight"}
                                    onChange={(e) => e.currentTarget.value}
                                    onIonChange={(e) => {
                                        setValue('max_nights', +e.detail.value)
                                        setState({ ...state, max_nights: +e.detail.value })
                                    }}
                                >
                                    <IonLabel slot="start">{state.max_nights}</IonLabel>
                                </IonRange>
                            )} />
                        {/* 
                        <small className="text-muted">
                            Default minimum night is 1 and the maximum is 30
                        </small> */}
                        {errors.max_nights && <small className='text-danger'>{errors.max_nights.message}</small>}
                    </div>

                    {/* CHECKIN */}
                    <div className="mt-2 ion-padding-horizontal">
                        <SpaceBetween>
                            <small>CheckIn Time</small>
                            <div>
                                <Controller
                                    name='checkin'
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Kindly specify your check in date'
                                        }
                                    }}
                                    render={({ field: { ref } }) => (
                                        <IonDatetime
                                            ref={ref}
                                            presentation="time"
                                            className="p-0"
                                            color={"warning"}
                                            aria-required
                                            onIonChange={(e) => {
                                                const checkInTime = getTimeOrDateFromDateTimeString(e.detail.value as string)
                                                setValue('checkin', checkInTime)
                                                setState({ ...state, checkin: checkInTime })
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </SpaceBetween>
                        {errors.checkin && <small className='text-danger'>{errors.checkin.message}</small>}
                    </div>

                    {/* CHECKOUT */}
                    <div className="mt-4 ion-padding-horizontal">
                        <SpaceBetween>
                            <small>Checkout Time</small>
                            <div>
                                <Controller
                                    name='checkout'
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Kindly specify checkout date'
                                        }
                                    }}
                                    render={({ field: { ref } }) => (
                                        <IonDatetime
                                            ref={ref}
                                            presentation="time"
                                            className="p-0"
                                            color={"warning"}
                                            aria-required
                                            onIonChange={(e) => {
                                                const checkOutTime = getTimeOrDateFromDateTimeString(e.detail.value as string)
                                                setValue('checkout', checkOutTime)
                                                setState({ ...state, checkout: checkOutTime })
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </SpaceBetween>
                        {errors.checkout && <small className='text-danger'>{errors.checkout.message}</small>}
                    </div>


                    <IonButton
                        className="yellow_fill my-5"
                        shape="round"
                        mode="ios"
                        size="large"
                        expand="block"
                        type="submit"
                    >
                        <AddApartmentFormPagination currentPage='5' maxPage='6' />
                        { }
                        Continue
                        <IonIcon icon={chevronForward} slot='end' />
                    </IonButton>

                </form>
            </IonContent>
        </IonPage>
    )
}

export default AddApartmentTimeRules