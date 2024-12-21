import { IonAccordion, IonAccordionGroup, IonBackButton, IonButton, IonButtons, IonCheckbox, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRange, IonRow, IonText, IonTitle, IonToolbar, useIonRouter, useIonToast, useIonViewDidEnter } from '@ionic/react'
import { useCallback, useMemo, useState } from 'react'
// css
import "./Filter.css"
import { useSetRecoilState } from 'recoil'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Apartment, SearchFilterApartmentType } from '../../@types/apartments'
import { searchFilterAtom } from '../../atoms/apartmentAtom'
import Slider from 'react-slick'



const chips: { title: string, value: string }[] = [
    { title: "All", value: "all" },
    { title: "Co-op", value: "co-op" },
    { title: "Loft", value: "loft" },
    { title: "Condo", value: "condo" },
    { title: "Duplex", value: "duplex" },
    { title: "Garden", value: "garden" },
    { title: "High-rise", value: "high-rise" },
    { title: "Low-rise", value: "low-rise" },
    { title: "Micro", value: "micro" },
    { title: "Railroad", value: "railroad" },
    { title: "Single Family", value: "single-family" },
    { title: "Triplex", value: "triplex" },
    { title: "Walk up", value: "walk-up" },
]



const Filter = () => {
    // todo: set min range state
    // todo: set max range state
    // todo: set average

    const router = useIonRouter()

    const [displayToast, _] = useIonToast()

    const setSearchFilterAtom = useSetRecoilState(searchFilterAtom)

    const { handleSubmit, formState: { errors }, control, setValue, register } = useForm<SearchFilterApartmentType>({
        defaultValues: {
            pets_allowed: false,
            party_allowed: false,
            smoking_allowed: false,
            children_allowed: false,
            // guests: 0,
            has_gym: false,
            has_security: false,
            has_laundry: false,
            has_tv_cable: false,
            has_wifi: false,
            // type: 'duplex',
            // bedrooms: 0,
            price_range: {
                max: 1000,
                min: 1000
            }
        }
    })

    const [price, setPrice] = useState({ upper: 1000, lower: 1000 })

    const averageApartmentPrice = useMemo(() => {
        const { upper, lower } = price
        const averagePrice = (upper + lower) / 2
        setValue('price_range', { min: lower, max: upper })
        return averagePrice
    }, [price])


    useIonViewDidEnter(() => {
    }, [])


    const handleFormSubmit: SubmitHandler<SearchFilterApartmentType> = (data) => {
        // console.log("🚀 ~ file: Filter.tsx:54 ~ Filter ~ data:", data)
        setSearchFilterAtom(data)
        router.push('/apartment_search_filter_result/', "forward")
    }


    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar>
                    <IonButtons slot="start">
                        {/* todo:  */}
                        <IonBackButton mode='ios' defaultHref='/home'></IonBackButton>
                    </IonButtons>
                    <IonTitle>Filters</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding' fullscreen>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    {/* apartment category */}
                    {/* TODO: use this as a search to display apartments based on apartment type */}
                    <IonGrid>
                        <IonRow>
                            { chips.map(({title, value}) => (
                                <IonCol size='3' key={value}>
                                    <IonChip onClick={e => setValue("type", value as Apartment)} color={'warning'} className='brown_fill'>{title}</IonChip>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                    {/* ----------- [ Price Range] ----------------- */}
                    <section className="border rounded-4 p-4">
                        <IonText>Price range</IonText>

                        <div className="my-3">
                            <div>₦{price.lower} - ${price.upper}</div>
                            <span className="text-muted">The average nightly price2 ₦{averageApartmentPrice}</span>
                        </div>

                        <Controller
                            name='price_range'
                            control={control}
                            rules={{}}
                            render={() => (
                                <IonRange
                                    id='filter_prince_range'
                                    color={"dark"}
                                    mode='ios'
                                    dualKnobs={true}
                                    style={{ fontSize: "40px" }}
                                    max={100000}
                                    min={1000}
                                    step={1000}
                                    snaps
                                    onIonChange={(e) => setPrice({ ...price, ...e.detail.value as { upper: number, lower: number } })}
                                />
                            )}
                        />

                    </section>
                    {/* -------------------- [ CArd ] ------------------- */}
                    <section className='mt-3'>
                        <IonAccordionGroup multiple mode='ios'>

                            <IonAccordion value='amenities' className='rounded-5'>
                                <IonItem slot="header" color="light" className='ion-padding' lines='none'>
                                    <IonLabel>House rules</IonLabel>
                                </IonItem>

                                <div className="ion-padding" slot="content">
                                    <IonList lines='none'>
                                        <IonItem>
                                            <IonCheckbox
                                                justify='space-between'
                                                color='warning'
                                                {...register('party_allowed')}
                                                onIonChange={(e) => setValue('party_allowed', e.detail.checked)}
                                            >
                                                Parties allowed
                                            </IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox
                                                justify='space-between'
                                                color='warning'
                                                {...register('pets_allowed')}
                                                onIonChange={(e) => setValue('pets_allowed', e.detail.checked)}
                                            >
                                                Pets allowed
                                            </IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox
                                                justify='space-between'
                                                color='warning'
                                                {...register('smoking_allowed')}
                                                onIonChange={(e) => setValue('smoking_allowed', e.detail.checked)}
                                            >
                                                Smoking allowed
                                            </IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox
                                                justify='space-between'
                                                color='warning'
                                                {...register('children_allowed')}
                                                onIonChange={(e) => setValue('children_allowed', e.detail.checked)}
                                            >
                                                Children allowed
                                            </IonCheckbox>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </IonAccordion>

                            <IonAccordion value='house_rules' className='rounded-3'>
                                <IonItem slot="header" color="light" className='ion-padding' lines='none'>
                                    <IonLabel>Amenities</IonLabel>
                                </IonItem>

                                <div className="ion-padding" slot="content">
                                    <IonList lines='none'>
                                        <IonItem>
                                            <IonCheckbox
                                                justify='space-between'
                                                color='warning'
                                                {...register('has_tv_cable')}
                                                onIonChange={(e) => setValue('has_tv_cable', e.detail.checked)}
                                            >
                                                Cable TV
                                            </IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox
                                                justify='space-between'
                                                color='warning'
                                                {...register('has_gym')}
                                                onIonChange={(e) => setValue('has_gym', e.detail.checked)}
                                            >
                                                Gym
                                            </IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox
                                                justify='space-between'
                                                color='warning'
                                                {...register('has_security')}
                                                onIonChange={(e) => setValue('has_security', e.detail.checked)}
                                            >
                                                Security
                                            </IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox
                                                justify='space-between'
                                                color='warning'
                                                {...register('has_wifi')}
                                                onIonChange={(e) => setValue('has_wifi', e.detail.checked)}
                                            >
                                                WifiÏ
                                            </IonCheckbox>
                                        </IonItem>
                                        <IonItem>
                                            <IonCheckbox
                                                justify='space-between'
                                                color='warning'
                                                {...register('has_laundry')}
                                                onIonChange={(e) => setValue('has_laundry', e.detail.checked)}
                                            >
                                                Laundry
                                            </IonCheckbox>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </IonAccordion>
                            {/* <IonAccordion value='accomodation_type' className='rounded-5'>
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
                            </IonAccordion> */}

                            {/* <IonAccordion value='bedroom' className='rounded-5'>
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
                            </IonAccordion> */}

                            {/* 
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
                            </IonAccordion> */}

                            {/* <IonAccordion value='unique_stays' className='rounded-5'>
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
                            </IonAccordion> */}

                        </IonAccordionGroup>
                    </section>
                    <div className="ion-text-center my-3">
                        <IonButton className='brown_fill w-25' size='large' shape='round' mode='ios' type='submit'>Apply</IonButton>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default Filter