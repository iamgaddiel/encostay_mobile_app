import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar, useIonRouter } from '@ionic/react'
import React from 'react'

import { useForm, SubmitHandler } from "react-hook-form"
import { AddApartmentLocationType } from '../../@types/apartments'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { addApartmentAtom } from '../../atoms/apartmentAtom'
import { chevronForward } from 'ionicons/icons'
import AddApartmentFormPagination from '../../components/AddApartmentFormPagination'


const AddApartmentLocation = () => {

  const router = useIonRouter()

  const [apartmentState, setAddApartmentState] = useRecoilState(addApartmentAtom)

  const { register, handleSubmit, formState: { errors } } = useForm<AddApartmentLocationType>()


  const handleFormSubmit: SubmitHandler<AddApartmentLocationType> = (data) => {
    setAddApartmentState({ ...apartmentState, ...data })
    router.push('/add_apartment_details')
  }


  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref='/' />
            <IonTitle>Add Apartment</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* 
                -----------------------------------------------------------------
                ----------------------------- Apartment Location-------------------
                -----------------------------------------------------------------
       */}
          <div className="mt-1 ion-padding">
            <small className="text-muted border-bottom block text-uppercase">
              Apartment Location
            </small>
          </div>

          {/* Title */}
          <div className="mt-2 ion-padding-horizontal">
            <small>Tile</small>
            <div className="rounded-5 mt-2 px-3 grey__bg">
              <IonInput
                type="text"
                placeholder="Apartment title"
                {
                ...register('title', {
                  required: {
                    value: true,
                    message: 'Apartment title is required'
                  }
                })
                }
              />
            </div>
            {errors.title && <small className='text-danger'>{errors.title.message} </small>}
          </div>

          {/* Description */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <small>Description</small>
            <div className="rounded-5 mt-2 px-3 grey__bg">
              <IonTextarea
                placeholder="Enter apartment description"
                {
                ...register('description', {
                  required: {
                    value: true,
                    message: 'Apartment description is required'
                  }
                })
                }
              />
            </div>
            {errors.description && <small className='text-danger'>{errors.description.message} </small>}
          </div>

          {/* Address */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <small>Address</small>
            <div className="rounded-5 mt-2 px-3 grey__bg">
              <IonInput
                type="text"
                placeholder="123 John Street"
                {
                ...register('address', {
                  required: {
                    value: true,
                    message: 'Apartment address is required'
                  }
                })
                }
              />
            </div>
            {errors.address && <small className='text-danger'>{errors.address.message} </small>}

          </div>

          {/* CITY */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <small>City</small>
            <div className="rounded-5 mt-2 px-3 grey__bg">
              <IonInput
                type="text"
                placeholder="Free Town"
                {
                ...register('city', {
                  required: {
                    value: true,
                    message: 'City is required'
                  }
                })
                }
              />
            </div>
            {errors.city && <small className='text-danger'>{errors.city.message} </small>}
          </div>

          {/* State */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <small>State</small>
            <div className="rounded-5 mt-2 px-3 grey__bg">
              <IonInput
                type="text"
                placeholder="Lagos"
                {
                ...register('state_location', {
                  required: {
                    value: true,
                    message: 'State is required'
                  }
                })
                }
              />
            </div>
            {errors.state_location && <small className='text-danger'>{errors.state_location.message} </small>}
          </div>

          {/* COUNTRY */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <small>Country</small>
            <div className="rounded-5 mt-2 px-3 grey__bg">
              <IonInput
                type="text"
                placeholder="Nigeria"
                {
                ...register('country', {
                  required: {
                    value: true,
                    message: 'Country is required'
                  }
                })
                }
              />
            </div>
            {errors.country && <small className='text-danger'>{errors.country.message} </small>}
          </div>

          <IonButton
            className="yellow_fill my-5"
            shape="round"
            mode="ios"
            size="large"
            expand="block"
            type="submit"
          >
            <AddApartmentFormPagination currentPage='1' maxPage='6' />
            { }
            Continue
            <IonIcon icon={chevronForward} slot='end' />
          </IonButton>

        </form>

      </IonContent>
    </IonPage>
  )
}

export default AddApartmentLocation